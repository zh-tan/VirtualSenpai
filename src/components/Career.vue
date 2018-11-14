<template>
  <div classname="charts" class="zoomout">
    <br />
    <div
      style="display:grid; grid-template-columns:repeat(4,1fr);margin:0px;padding-left:5px"
    >
      <h5>Want to view another major?</h5>
      <select
        @change="$router.push({ path: '/careerview/' + prog });"
        v-model="prog"
      >
        <option v-for="deg in majorslist" :key="deg"> {{ deg }} </option>
      </select>
    </div>
    <div style="display:grid;grid-template-columns:3fr 2fr">
      <!-- Start of first column -->

      <!--
        Testing button dropdown
        <div>
          <b-dropdown id="ddown1" text="Select your Major" class="m-md-2">
            <b-dropdown-item v-for="deg in majorslist" :key="deg" @click.native= "$router.push({ path: '/careerview/'+prog})" v-model="prog"> {{ deg }}</b-dropdown-item>
          </b-dropdown>
        </div>
      -->

      <!-- Charts -->
      <div v-if="NotDefault" style="height:97.5%">
        <card
          cascade
          class="cascading-admin-card"
          style="height:100%"
          :border="bordercolor"
        >
          <div class="piechart">
            <card-header class="text-left"
              ><h4>
                Breakdown of
                <strong
                  ><u>{{ careerTitle }}</u></strong
                >
              </h4></card-header
            >

            <card-body>
              <div class="hiring">
                <h6><b>Hiring Industries</b></h6>
              </div>
              <div class="piechart">
                <canvas id="piecanvas" width="650" height="150"> </canvas>
              </div>
              <br />
              <div style="display:grid;grid-template-columns:1fr 1fr">
                <div class="d-flex justify-content-left" style="display:block">
                  <canvas id="salaryCanvas" width="370" height="270"> </canvas>
                </div>
                <div
                  class="d-flex justify-content-center"
                  style="display:block"
                >
                  <canvas id="hiringCanvas" width="370" height="270"> </canvas>
                </div>
              </div>
            </card-body>
          </div>
        </card>
      </div>

      <!-- End of Charts -->

      <!-- End of first column -->

      <!-- Start of second column -->
      <!-- Common roles table -->
      <div style="height:96%">
        <card
          cascade
          class="cascading-admin-card"
          :border="bordercolor"
          style="height:50%"
        >
          <card-header class="text-left"
            >Common Roles
            <select @change="refreshYR(curYr);" v-model="curYr">
              <option selected disabled>Select a year</option>
              <option v-for="year in years" :key="year"> {{ year }} </option>
            </select>
          </card-header>

          <div class="rolestable">
            <div width="650" height="550">
              <b-table
                :items="top5roles"
                :sort-by.sync="sort"
                :sort-desc.sync="dir"
                :no-sort-reset="dir"
                small
                hover
                head-variant="light"
              ></b-table>
            </div>
          </div>
        </card>
        <!-- End of common roles table -->

        <!-- Skills leaderboard -->
        <card
          cascade
          class="cascading-admin-card"
          style="height:50%"
          :border="bordercolor"
        >
          <card-header class="text-left">Key Areas of Improvement</card-header>
          <div class="skillstable">
            <div>
              <b-table
                class="skillsTable"
                small
                hover
                :items="items"
                head-variant="light"
              ></b-table>
            </div>
          </div>
        </card>
      </div>
    </div>
    <!-- End of Skills leaderboard -->
  </div>
</template>

<script>
import { db } from "../firebase";
import IEcharts from "vue-echarts-v3/src/lite.js";
import randomcolor from "randomcolor";
import "echarts-wordcloud";
import Vue from "vue";
import careerSearch from "./careerSearch";
import Chart from "chart.js";
import {
  Row,
  Column,
  Btn,
  Fa,
  PieChart,
  BarChart,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Tooltip
} from "mdbvue";
// mods[modulecode][semester]

//console.log(modRef)
export default {
  created() {
    this.NotDefault = this.$route.path !== "/careerview";
    if (this.NotDefault) {
      this.careerTitle = this.$route.params.careerTitle;
      this.careerRef = db.ref("career/" + this.careerTitle);
    }
  },
  mounted() {
    db.ref("majors_list")
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      })
      .then(result => {
        this.majorslist = result;
      });
    if (this.NotDefault) {
      this.careerRef
        .once("value")
        .then(snapshot => {
          this.career = snapshot.val();
        })
        .then(() => {
          this.rendered = this.getbreakdown();
        })
        .then(() => {
          this.renderCharts();
          // render charts after obtaining data
        });
    }
  },
  components: {
    Row,
    Column,
    Btn,
    Fa,
    PieChart,
    BarChart,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardText,
    careerSearch,
    Tooltip
  },
  data() {
    return {
      // i think this is needed to make it reactive
      // got to do with Vue Lifecycle
      sort: "Popularity",
      dir: true,
      currYR: null,
      top5roles: [],
      years: [],
      roles: [],
      careerTitle: null,
      top5Skills: [],
      top5Scores: [],
      rendered: false,
      careerRef: [],
      bordercolor: "#42b883",
      pieInstance: null,
      salaryInstance: null,
      hiringInstance: null,
      changing: false,
      pieChartData: {},
      salaryLineData: {},
      hiringLineData: {},
      salaryData: [],
      salMin: [],
      salMax: [],
      hireMax: [],
      hireMin: [],
      hiringData: [],
      majorslist: [],
      NotDefault: false,
      pieselection: [false, false, false, false, false],
      myColors:  [
      "#9284C1",
      "#D18296",
      "#E9A784",
      "#85A3BC",

      "#989898",


      "#B2C183",
      "#E8D983",
      "#C1B083",

      "#BC82D1",
      "#96D182",
        "#82D1BD",
        "#E883C5",
        "#83C5E8",

        "#84BC9E",
        "#BC84A3",
        "#BC9D84",
        "#989898",
        "#83E8A6",
        "#F87B7E",
        "#83B2C1",
        "#C19283",
        "#4D5360",
        "#FDB45C",
        "#E4BCE2",
        "#E5BFBC",
      ],
      prog: ""
    };
  },
  methods: {
    renderCharts() {
      this.pieInstance = this.renderPieChart();
      this.salaryInstance = this.renderSalaryLine();
      this.hiringInstance = this.renderHiringLine();

      var canvas = document.getElementById("piecanvas");
      var self = this;

      canvas.onclick = function(e) {
        var activePoints = self.pieInstance.getElementsAtEvent(e);

        //console.log(activePoints);
        if (activePoints.length === 1) {
          var index = activePoints[0]["_index"];

          var ci = self.pieInstance.chart;
          var ci2 = self.salaryInstance.chart;
          var ci3 = self.hiringInstance.chart;
          var meta2 = ci2.getDatasetMeta(index);
          var meta3 = ci3.getDatasetMeta(index);
          meta2.hidden =
            meta2.hidden === null ? !ci2.data.datasets[index].hidden : null;
          meta3.hidden =
            meta3.hidden === null ? !ci3.data.datasets[index].hidden : null;

          // try to modify selection of pie quadrant instance to change color
          // means not selected
          //console.log(self.pieChartData[0])

          if (self.pieselection[index] === false) {
            activePoints[0]["_chart"]["data"]["datasets"][0]["backgroundColor"][
              index
            ] = "#D3D3D3";

            //console.log(activePoints);
            self.pieselection[index] = true; //select
          } else {
            activePoints[0]["_chart"]["data"]["datasets"][0]["backgroundColor"][
              index
            ] = self.myColors[index];
            self.pieselection[index] = false; // disselect
          }
          ci.update();
          ci2.update();
          ci3.update();
        }
      };
    },
    getbreakdown() {
      let pielabels = [];
      let piedata = [];
      let industryObjects = [];
      let ranking = {};
      this.top5Skills = [];
      this.items = [];
      this.top5roles = [];
      this.top5Ranking = [];

      //This line below gets all the industry names for this major
      let salaryLineData = {
        labels: [],
        datasets: []
      };

      let hiringLineData = {
        labels: [],
        datasets: []
      };

      const data = this.career["industries"];
      const preparedness = this.career["preparedness"];

      //store the industry names
      let industryNames = [];
      for (var label in this.career["industries"]) {
        industryNames.push(label);
      }

      let hireYears = [];
      for (var hyear in this.career["industries"][industryNames[0]][
        "hiringCount"
      ]) {
        hireYears.push(hyear);
      }
      if (!this.changing) {
        this.currYR = hireYears.reverse()[0];
      }

      //store the years
      let salYears = [];
      for (var year in this.career["industries"][industryNames[0]][
        "median_sal"
      ]) {
        salYears.push(year);
      }

      var tracker = [];
      salaryLineData["labels"] = salYears;
      for (var industry in industryNames) {
        for (var role in this.career["industries"][industryNames[industry]][
          "roles"
        ][this.currYR]) {
          tracker.push(role);
        }
      }

      tracker = Array.from(new Set(tracker));
      console.log(tracker);

      for (var role in tracker) {
        var oneRole = {};
        oneRole["Role"] = tracker[role];
        oneRole["Popularity"] = 0.0;
        for (var industry in industryNames) {
          if (
            this.currYR in
            this.career["industries"][industryNames[industry]]["roles"]
          ) {
            if (
              tracker[role] in
              this.career["industries"][industryNames[industry]]["roles"][
                this.currYR
              ]
            ) {
              oneRole["Popularity"] =
                Math.round(
                  (oneRole["Popularity"] +
                    this.career["industries"][industryNames[industry]]["roles"][
                      this.currYR
                    ][tracker[role]]["percent"]) *
                    100
                ) / 100;
            }
          }
        }
        this.top5roles.push(oneRole);
      }
      // salYears = years
      this.top5roles = this.top5roles.slice(0, 5);

      this.years = hireYears.sort();
      hiringLineData["labels"] = hireYears;

      for (var name in industryNames) {
        var oneInd = {
          data: [],
          label: industryNames[name],
          fill: false,
          borderColor: this.myColors[name]
        };

        for (var oneYear in this.career["industries"][industryNames[name]][
          "median_sal"
        ]) {
          oneInd["data"].push(
            this.career["industries"][industryNames[name]]["median_sal"][
              oneYear
            ]
          );
        }
        salaryLineData["datasets"].push(oneInd);
      }

      for (var hname in industryNames) {
        var honeInd = {
          data: [],
          label: industryNames[hname],
          fill: false,
          borderColor: this.myColors[hname]
        };

        for (var honeYear in this.career["industries"][industryNames[hname]][
          "hiringCount"
        ]) {
          honeInd["data"].push(
            this.career["industries"][industryNames[hname]]["hiringCount"][
              honeYear
            ]
          );
        }
        hiringLineData["datasets"].push(honeInd);
      }

      for (var year in preparedness) {
        for (var k in preparedness[year]) {
          ranking[preparedness[year][k][0]] = preparedness[year][k][1];
        }
      }

      // Create items array
      var sortRanking = Object.keys(ranking).map(function(key) {
        return [key, ranking[key]];
      });

      // Sort the array based on the second element
      sortRanking.sort(function(first, second) {
        return first[1] - second[1];
      });

      const top5Ranking = {};
      var count = 0;
      for (var i in sortRanking) {
        top5Ranking[sortRanking[i][0]] = sortRanking[i][1];
        count++;
        if (count === 5) {
          break;
        }
      }
      for (var i in top5Ranking) {
        this.top5Skills.push(i);
        this.top5Scores.push(top5Ranking[i]);
      }
      var counter = 1;
      for (var skill in this.top5Skills) {
        var oneSkill = {};

        oneSkill["rank"] = counter;
        counter++;
        oneSkill["Skill"] = this.top5Skills[skill];
        this.items.push(oneSkill);
      }

      for (var value in data) {
        pielabels.push(value);
      }
      //this.salaryData
      industryObjects.push(this.career["industries"]);

      let medianSalary = [];
      let hiring = [];
      /*{
          name: "Healthcare",
          data: { "2015": 33, "2016": 34, "2017": 35, "2018": 34 }
        }*/
      var salRange = [];
      var hireRange = [];
      for (var name in pielabels) {
        var oneSal = {};
        var oneHire = {};
        oneSal["name"] = pielabels[name];
        oneHire["name"] = pielabels[name];
        oneSal["data"] = this.career["industries"][pielabels[name]][
          "median_sal"
        ];
        var oneMax = this.career["industries"][pielabels[name]]["median_sal"];
        for (var sal in oneMax) {
          salRange.push(oneMax[sal]);
        }
        oneHire["data"] = this.career["industries"][pielabels[name]][
          "hiringCount"
        ];
        var minmaxHire = this.career["industries"][pielabels[name]][
          "hiringCount"
        ];
        for (var hire in minmaxHire) {
          hireRange.push(minmaxHire[hire]);
        }
        medianSalary.push(oneSal);
        hiring.push(oneHire);
      }
      this.salMax = Math.max(...salRange);
      this.salMin = Math.min(...salRange);
      this.hireMax = Math.max(...hireRange);
      this.hireMin = Math.min(...hireRange);
      this.salaryData = medianSalary;

      this.hiringData = hiring;

      var industries = industryObjects[0];
      let industryList = [];
      for (var i in industries) {
        industryList.push(industries[i]);
      }

      let hiringCount = [];

      for (var attribute in industryList) {
        var thisIndustry = industryList[attribute]["hiringCount"];

        var count = 0;
        for (var year in thisIndustry) {
          count = count + thisIndustry[year];
        }
        hiringCount.push(count);
      }

      for (var key in hiringCount) {
        piedata.push(hiringCount[key]);
      }

      this.pieChartData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
            "#9284C1",
            "#D18296",
            "#E9A784",
            "#85A3BC",

            "#989898",


            "#B2C183",
            "#E8D983",
            "#C1B083",

            "#BC82D1",
            "#96D182",
              "#82D1BD",
              "#E883C5",
              "#83C5E8",

              "#84BC9E",
              "#BC84A3",
              "#BC9D84",
              "#989898",
              "#83E8A6",
              "#F87B7E",
              "#83B2C1",
              "#C19283",
              "#4D5360",
              "#FDB45C",
              "#E4BCE2",
              "#E5BFBC",
            ]
          }
        ]
      };

      this.rendered = true;
      this.pieChartData["labels"] = pielabels;
      this.pieChartData["datasets"][0]["data"] = piedata;

      //salaryLineData["datasets"][0]["data"] = [1000,1500,2000,900,2399]

      this.salaryLineData = salaryLineData;
      this.hiringLineData = hiringLineData;

      //this.piedata = piedata;

      return true;
    },
    renderPieChart() {
      var self = this;

      var ctx = document.getElementById("piecanvas").getContext("2d");

      var myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.pieChartData,
        options: {
          title: {
            display: false,
            text: "Hiring Industries",
            position: "top"
          },
          legend: {
            position: "right",
            onClick(e, legendItem) {
              var index = legendItem.index;
              var ci = self.pieInstance.chart;
              var ci2 = self.salaryInstance.chart;
              var ci3 = self.hiringInstance.chart;
              var meta2 = ci2.getDatasetMeta(index);
              var meta3 = ci3.getDatasetMeta(index);
              meta2.hidden =
                meta2.hidden === null ? !ci2.data.datasets[index].hidden : null;
              meta3.hidden =
                meta3.hidden === null ? !ci3.data.datasets[index].hidden : null;
              if (self.pieselection[index] === false) {
                ci["data"]["datasets"][0]["backgroundColor"][index] = "#D3D3D3";
                self.pieselection[index] = true; //select
              } else {
                //console.log(index)
                ci["data"]["datasets"][0]["backgroundColor"][index] =
                  self.myColors[index];
                self.pieselection[index] = false; // disselect
              }
              ci.update();
              ci2.update();
              ci3.update();
              // try to modify selection of pie quadrant instance to change color
              // means not selected
              //console.log(self.pieChartData[0])
            }
          }
        }
      });
      return myPieChart;
    },
    renderSalaryLine() {
      var self = this;

      var ctx = document.getElementById("salaryCanvas").getContext("2d");

      var mySalaryLine = new Chart(ctx, {
        type: "line",
        data: this.salaryLineData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Median Salaries ($)",
            position: "top"
          },
          legend: {
            display: false
          }
        }
      });
      return mySalaryLine;
    },
    renderHiringLine() {
      var self = this;

      var ctx = document.getElementById("hiringCanvas").getContext("2d");

      var myHiringLine = new Chart(ctx, {
        type: "line",
        data: this.hiringLineData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Hiring Trend (Number of people by Year)",
            position: "top"
          },
          legend: {
            display: false
          }
        }
      });
      return myHiringLine;
    },
    toggle() {
      this.rendered = false;
      setTimeout(() => {
        this.rendered = true;
      }, 1);
    },
    refreshYR(yr) {
      this.currYR = yr;
      this.changing = true;
      this.getbreakdown();
      this.toggle();
    }
  }
};
</script>
<style scoped>
.zoomout {
}

.cascading-admin-card {
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
}
.card[class*="border"] {
  border: 1.9px solid #2bbbad;
  box-shadow: none;
}
.cascading-admin-card .admin-up .fa {
  color: #fff;
}
.hiring {
  font-family: "Arial";
}

.html {
  overflow-y: scroll;
}
.rolestable {
  vertical-align: left;
}
</style>
