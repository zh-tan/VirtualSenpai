<template>
  <div classname="charts">
    <br />
    <row>
      <column xl="4" md="4"></column>
      <column xl="4" md="4">
        <h2>Select a Major</h2>
        <card>
          <select
            @change="$router.push({ path: '/careerview/' + prog });"
            v-model="prog"
          >
            <option v-for="deg in majorslist" :key="deg"> {{ deg }} </option>
          </select>
        </card>
      </column>
      <column xl="4" md="4"></column>
    </row>
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
      currYR: "2017",
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
      myColors: [
        "#9284C1",
        "#B2C183",
        "#C19283",
        "#83B2C1",
        "#D18296",
        "#BC82D1",
        "#96D182",
        "#82D1BD",

        "#E9A784",
        "#E883C5",
        "#83E8A6",
        "#83C5E8",

        "#85A3BC",
        "#84BC9E",
        "#BC84A3",
        "#BC9D84",
        "#989898"
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

      for (var role in tracker) {
        var oneRole = {};
        oneRole["Role"] = tracker[role];
        oneRole["Popularity"] = 0.0;
        console.log(industryNames);
        for (var industry in industryNames) {
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
        this.top5roles.push(oneRole);
      }
      // salYears = years

      let hireYears = [];
      for (var hyear in this.career["industries"][industryNames[0]][
        "hiringCount"
      ]) {
        hireYears.push(hyear);
      }
      this.years = hireYears;
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
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#ac64ad",
              "#4f49eb",
              "#4cec04",
              "#77c019",
              "#86c0d1",
              "#ed4689"
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
            text: "Median Salaries",
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
            text: "Hiring Trend",
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
      this.getbreakdown();
      this.toggle();
    }
  }
};
</script>
<style scoped>
.cascading-admin-card {
  margin: 25px;
  margin-top: 10px;
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
