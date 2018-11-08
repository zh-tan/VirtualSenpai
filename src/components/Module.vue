<template>
  <div class="charts">
    <row>
      <column xl="6" md="6" class="mb-r">
        <div class="module" style="height:90px">
          <card cascade class="cascading-admin-card" :border="bordercolor">
            <card-header class="text-left">Module Information </card-header>
            <div class="admin-up">
              <fa icon="line-chart" class="success-color" />
              <div class="data"></div>
            </div>

            <div style="height: 130px">
              <row>
                <column>
                  <card-body>
                    <div class="moduleinfo">
                      <div class="modulebtn">
                        <b-button :pressed="true" variant="info"
                          >{{ modCode }}: {{ mod_name }}</b-button
                        >

                        <br />
                        <b-button variant="warning"
                          >Currently Displaying: {{ AY }}</b-button
                        >
                      </div>

                      Select Semester:
                      <select @change="refreshAY(curSem);" v-model="curSem">
                        <option selected disabled>Select a semester</option>
                        <option v-for="sem in AYList" :key="sem">
                          {{ sem }}
                        </option>
                      </select>
                    </div>
                  </card-body>
                </column>

                <column>
                  Professor-in-charge:
                  <badge pill color="rgba-blue-grey-strong">{{
                    prof_name
                  }}</badge>
                </column>
              </row>
            </div>
          </card>
        </div>
      </column>

      <column xl="3" md="6">
        <card cascade class="cascading-admin-card" :border="bordercolor">
          <card-header class="text-left">Average Rating </card-header>
          <div class="admin-up">
            <fa icon="line-chart" class="warning-color" />
          </div>

          <div class="data">
            <h1>
              <span v-bind:style="spancolor">
                {{ avg_rating }} / <b>5</b>
              </span>
            </h1>
          </div>
          <div style="height: 70px">
            <card-body>
              <div class="commentary">
                <div>
                  <b-progress
                    :value="avg_rating"
                    :max="5"
                    :variant="avg_rating_bar"
                    animated
                  ></b-progress>
                </div>

                <card-text>{{ avg_rating_commentary }} </card-text>
              </div>
            </card-body>
          </div>
        </card>
      </column>

      <column xl="3" md="6" class="mb-r">
        <card cascade class="cascading-admin-card" :border="bordercolor">
          <card-header class="text-left"> Difficulty Rating </card-header>
          <div class="admin-up">
            <fa icon="pie-chart" class="light-blue lighten-1" />
          </div>
          <div class="data">
            The general sensing for students in<strong> {{ AY }} </strong> with
            respect to difficulty levels
          </div>
          <card-body>
            <b-progress class="mt-1" :max="100" show-value>
              <b-progress-bar
                :value="opinion_rating_good"
                variant="success"
              ></b-progress-bar>
              <b-progress-bar
                :value="opinion_rating_average"
                variant="warning"
              ></b-progress-bar>
              <b-progress-bar
                :value="opinion_rating_bad"
                variant="danger"
              ></b-progress-bar>
            </b-progress>

            <card-text class="text">
              <span
                v-if="opinion_rating_bad != 0"
                class="easy"
                style="float:left; width:34%; text-align:left;"
              >
                Easy
              </span>
              <span
                v-if="opinion_rating_average != 0"
                class="normal"
                style="float:left; width:33%; text-align: center;"
              >
                Normal
              </span>
              <span
                v-if="opinion_rating_good != 0"
                class="hard"
                style="float:right; width:33%; text-align: right;"
              >
                Hard
              </span>
            </card-text>
          </card-body>
        </card>
      </column>
    </row>

    <row>
      <column xl="6" md="6">
        <card cascade class="cascading-admin-card" :border="bordercolor">
          <card-header class="text-left">Cohort Breakdown </card-header>
          <card-body>
            <div class="piechart">
              <canvas id="piecanvas" width="700" height="150"> </canvas>
            </div>

            <div class="barchart"><canvas id="barcanvas"> </canvas></div>
          </card-body>
        </card>
      </column>

      <column>
        <card class="mb-4" :border="bordercolor">
          <card-header class="text-left"> Positive Feedback </card-header>
          <card-body>
            <div class="echarts">
              <IEcharts v-if="rendered" :option="wordcloud" @ready="onReady" />
            </div>
          </card-body>
        </card>
      </column>

      <column>
        <card class="mb-4" :border="bordercolor">
          <card-header class="text-left"> Negative Feedback </card-header>
          <card-body>
            <div class="echarts">
              <IEcharts
                class="wc"
                v-if="rendered"
                :option="wordcloudB"
                @ready="onReadyB"
              />
            </div>
          </card-body>
        </card>
      </column>
    </row>
  </div>
</template>

<script src="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
</script>
<script>
import { db } from "../firebase";
import {
  Row,
  Column,
  Btn,
  Badge,
  Fa,
  PieChart,
  BarChart,
  Card,
  CardBody,
  CardHeader,
  CardText
} from "mdbvue";
import IEcharts from "vue-echarts-v3/src/lite.js";
import randomcolor from "randomcolor";
//import wordcloud from "vue-wordcloud";
import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
//import wordcloud from "echarts-wordcloud";
// mods[modulecode][semester]
import "echarts-wordcloud";
import Chart from "chart.js";

//console.log(modRef)
export default {
  created() {
    this.modCode = this.$route.params.modCode;
    this.modRef = db.ref("mods/" + this.modCode);
  },
  mounted() {
    this.modRef
      .once("value")
      .then(snapshot => {
        this.mods = snapshot.val();
      })
      .then(() => {
        this.getAY();
        this.get_words();
        this.rendered = this.getbreakdown();
        this.gradesdist();
        this.avg_rating = this.avgrating();
        this.opinion_rating = this.opinionrating();
      })
      .then(() => {
        this.renderCharts();
        // render charts after obtaining data
      });
    db.ref("mod_summary/" + this.modCode)
      .once("value")
      .then(snapshot => {
        this.mod_name = snapshot.val().mod_name;
      });
  },
  props: {},
  components: {
    Row,
    Column,
    Btn,
    Badge,
    Fa,
    PieChart,
    BarChart,
    IEcharts,
    Card,
    CardBody,
    CardHeader,
    CardText
  },
  data() {
    return {
      //need a method to dynamically select latest
      //available AY
      modRef: {},
      AYList: [],
      AY: "2017-S2",
      word_cloud: [],
      word_cloud_b: [],
      ins: null,
      echarts: null,
      mods: {},
      wordcloud: {},
      wordcloudB: {},
      mod_name: "",
      pieChartOptions: {},
      pieChartData: {},
      gradesdistdata: {},
      gradedistoptions: {},
      rendered: false,
      avg_rating: "",
      opinion_rating: "",
      total_opinion_rating: {},
      spancolor: "",
      avg_rating_bar: "",
      opinion_rating_average: "",
      opinion_rating_good: "",
      opinion_rating_bad: "",
      bar_colour: ["#9284C1", "#D18296", "#E9A784", "#85A3BC"],
      pieInstance: null,
      barInstance: null,
      pieselection: [false, false, false, false],
      tabs: "&emsp; &emsp;",
      profname: "",
      bordercolor: "#42b883"
    };
  },
  computed: {
    avg_rating_commentary() {
      var output = "";
      const percentage = Math.round((this.avg_rating / 5) * 100);
      if (this.avg_rating > 3.5) {
        this.avg_rating_bar = "success";
        output = "high";
      } else if (this.avg_rating > 2.5) {
        this.avg_rating_bar = "warning";
        output = "normal";
      } else {
        this.avg_rating_bar = "danger";
        output = "low";
      }

      return (
        "Students have a " + output + " Average Rating of " + percentage + "%"
      );
    },
    prof_name() {
      var output = this.mods[this.AY]["Prof_data"]["name"];

      return output;
    }
  },
  methods: {
    renderCharts() {
      this.pieInstance = this.renderPieChart();
      this.barInstance = this.renderBarChart();
      // onclick event
      var canvas = document.getElementById("piecanvas");

      // to prevent reference conflict
      // in onclick event, "this" refers to chart instance instead of vue instance
      var self = this;
      canvas.onclick = function(e) {
        //console.log(self.pieInstance)
        var activePoints = self.pieInstance.getElementsAtEvent(e);
        console.log("Active points from render charts: ");
        console.log(activePoints);

        // when a pie quadrant is selected, there will be an array of 1
        // this is to prevent an error if clicked on any part of the canvas
        // (Unable to access [0]["_index"] from undefined)
        if (activePoints.length === 1) {
          var index = activePoints[0]["_index"];
          var ci = self.pieInstance.chart;
          var ci2 = self.barInstance.chart;
          var meta2 = ci2.getDatasetMeta(index);
          meta2.hidden =
            meta2.hidden === null ? !ci2.data.datasets[index].hidden : null;

          // try to modify selection of pie quadrant instance to change color
          // means not selected
          //console.log(self.pieChartData[0])

          if (self.pieselection[index] == false) {
            activePoints[0]["_chart"]["data"]["datasets"][0]["backgroundColor"][
              index
            ] =
              "#D3D3D3";
            console.log("Active points when deselect: ");
            console.log(activePoints);
            self.pieselection[index] = true; //select
          } else {
            activePoints[0]["_chart"]["data"]["datasets"][0]["backgroundColor"][
              index
            ] =
              self.bar_colour[index];
            self.pieselection[index] = false; // disselect
          }
          ci.update();
          ci2.update();
        }
      };
    },
    toggle() {
      this.rendered = false;
      setTimeout(() => {
        this.rendered = true;
      }, 1);
    },
    getAY() {
      this.AYList = Object.keys(this.mods);
      this.AYList.sort();
      this.AYList.reverse();
      this.AY = this.AYList[0];
    },

    refreshAY: function(year) {
      this.AY = year;
      this.getbreakdown();
      this.gradesdist();
      this.avg_rating = this.avgrating();
      this.opinion_rating = this.opinionrating();
      this.get_words();
      this.pieInstance.data = this.pieChartData;
      this.barInstance.data = this.gradesdistdata;
      this.barInstance.update();
      this.pieInstance.update();
      this.toggle();
    },
    avgrating() {
      const test = this.mods[this.AY]["avr_rating"];
      if (test > 3.5) {
        this.spancolor = "color:lightgreen";
      } else if (test > 2.5) {
        this.spancolor = "color:orange";
      } else {
        this.spancolor = "color:red";
      }
      //console.log(this.mods[this.AY]["opinion"]);
      return test;
    },
    opinionrating() {
      // dictionary of values {Excellent: 0.5, Average: 0.5}
      const values = this.mods[this.AY]["opinion"];
      //console.log(values["Average"]);
      var output = "";
      var counter = 0;
      const visited = [];

      //reset total opinion rating
      this.total_opinion_rating["good"] = 0;
      this.total_opinion_rating["average"] = 0;
      this.total_opinion_rating["bad"] = 0;

      this.opinion_rating_average = 0;
      this.opinion_rating_good = 0;
      this.opinion_rating_bad = 0;

      // loop through maximum from Excellent to Poor
      for (var x in values) {
        if ("Very good" in values && !visited.includes("Very good")) {
          visited.push("Very good");
          //console.log("here");
          this.total_opinion_rating["good"] += values["Very good"];
          output +=
            (values["Very good"] * 100).toFixed(1) + "% rated Very good";
        } else if ("Good" in values && !visited.includes("Good")) {
          visited.push("Good");
          this.total_opinion_rating["good"] += values["Good"];
          output += (values["Good"] * 100).toFixed(1) + "% rated Good";
        } else if ("Average" in values && !visited.includes("Average")) {
          //console.log("here")
          this.total_opinion_rating["average"] += values["Average"];
          visited.push("Average");
          output += (values["Average"] * 100).toFixed(1) + "% rated Average";
        } else if (
          "Below average" in values &&
          !visited.includes("Below average")
        ) {
          this.total_opinion_rating["bad"] += values["Below average"];
          visited.push("Below average");
          output +=
            (values["Below average"] * 100).toFixed(1) +
            "% rated Below average";
        } else if ("Poor" in values && !visited.includes("Poor")) {
          this.total_opinion_rating["bad"] += values["Poor"];
          visited.push("Poor");
          output += (values["Poor"] * 100).toFixed(1) + "% rated Poor";
        }
        counter++;

        output += "\n";
        // to show top 2 values
        if (output.size == 2) {
          break;
        }
      }

      // check if 0, otherwise 0 * 100 = NAN0 ERROR
      if (this.total_opinion_rating["average"] != 0) {
        this.opinion_rating_average =
          this.total_opinion_rating["average"] * 100;
      }
      if (this.total_opinion_rating["bad"] != 0) {
        this.opinion_rating_bad = this.total_opinion_rating["bad"] * 100;
      }
      if (this.total_opinion_rating["good"]) {
        this.opinion_rating_good = this.total_opinion_rating["good"] * 100;
      }

      //console.log(this.total_opinion_rating);
      return output;
    },

    onReady(instance, echarts) {
      const that = this;
      that.ins = instance;
      that.echarts = echarts;
      that.wordcloud = {
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            gridSize: 1,
            sizeRange: [12, 30],
            rotationRange: [0, 0],
            shape: "pentagon",
            width: 300,
            height: 350,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: this.word_cloud
          }
        ]
      };
    },
    onReadyB(instance, echarts) {
      const that = this;
      that.ins = instance;
      that.echarts = echarts;
      that.wordcloudB = {
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            gridSize: 3,
            sizeRange: [12, 30],
            rotationRange: [0, 0],
            shape: "pentagon",
            width: 280,
            height: 360,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: this.word_cloud_b
          }
        ]
      };
    },

    // method for piechart to initialise
    getbreakdown() {
      const data = this.mods[this.AY]["cohort"];
      let pielabels = [];
      let piedata = [];

      for (var value in data) {
        pielabels.push(value);
        piedata.push(data[value]);
      }

      this.pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false
      };
      //altering the element would trigger a rerender?
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
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#ac64ad"
            ],
            hoverBackgroundColor: [
              // "#FF5A5E",
              // "#5AD3D1",
              // "#FFC870",
              // "#A8B3C5",
              // "#616774",
              // "#da92db"
            ]
            // borderColor: [
            // "#9284C1",
            //   "#D18296",
            //   "#E9A784",
            //   "#85A3BC",
            //   "#FF5A5E",
            //   "#5AD3D1",
            //   "#FFC870",
            //   "#A8B3C5",
            //   "#616774",
            //   "#da92db"
            // ],
            // borderWidth: 3
          }
        ]
      };

      //this.rendered = true;
      this.pieChartData["labels"] = pielabels;
      this.pieChartData["datasets"][0]["data"] = piedata;

      return true;
    },
    renderPieChart() {
      var self = this;

      var ctx = document.getElementById("piecanvas").getContext("2d");

      var myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.pieChartData,
        options: {
          legend: {
            position: "right",
            onClick(e, legendItem) {
              var index = legendItem.index;
              console.log("Index from renderPieChart: ");
              console.log(index);
              var ci = self.pieInstance.chart;
              var ci2 = self.barInstance.chart;
              var meta2 = ci2.getDatasetMeta(index);
              meta2.hidden =
                meta2.hidden === null ? !ci2.data.datasets[index].hidden : null;
              if (self.pieselection[index] == false) {
                ci["data"]["datasets"][0]["backgroundColor"][index] = "#D3D3D3";
                self.pieselection[index] = true; //select
              } else {
                ci["data"]["datasets"][0]["backgroundColor"][index] =
                  self.bar_colour[index];
                self.pieselection[index] = false; // disselect
              }
              ci.update();
              ci2.update();
              // try to modify selection of pie quadrant instance to change color
              // means not selected
              //console.log(self.pieChartData[0])
            }
          }
        }
      });

      return myPieChart;
      ci.update();
      ci2.update();
    },

    // method for barchart to initialise
    gradesdist() {
      //const AY = "2017-S2";
      const grades = [
        "F",
        "E",
        "D",
        "C-",
        "C",
        "C+",
        "B-",
        "B",
        "B+",
        "A-",
        "A",
        "A+"
      ];

      const idxmap = {
        F: 0,
        E: 1,
        D: 2,
        "C-": 3,
        C: 4,
        "C+": 5,
        "B-": 6,
        B: 7,
        "B+": 8,
        "A-": 9,
        A: 10,
        "A+": 11
      };

      const data = this.mods[this.AY]["grades"];
      const dataset = [];
      const percourse = {};
      var counter = 0;

      for (var course in data) {
        const gradescount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // count the number of grades in each course
        for (var lettergrade in data[course]) {
          // find index through mapping to increase count
          const idx = idxmap[lettergrade];
          //console.log(lettergrade);
          gradescount[idx] += data[course][lettergrade];
        }
        // append to datasets to contain standard format
        dataset.push({
          label: course,
          data: gradescount,
          backgroundColor: this.bar_colour[counter] //"#D6E9C6" // green
        });

        counter++;
      } // end of outer for loop

      // reinitialise dataset so that charts will re-render
      this.gradesdistdata = {
        labels: grades,
        datasets: dataset
      };

      this.gradedistoptions = {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      };
      this.rendered = true;
    },
    renderBarChart() {
      var self = this;
      var ctx = document.getElementById("barcanvas").getContext("2d");

      var myBarChart = new Chart(ctx, {
        type: "bar",
        data: this.gradesdistdata,
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        }
      });

      return myBarChart;
    },
    get_words() {
      var goodwords = [];
      var words = Object.keys(this.mods[this.AY]["likes_WC"]);
      for (var i in words) {
        goodwords.push({
          name: words[i],
          value: this.mods[this.AY]["likes_WC"][words[i]]
        });
      }
      var badwords = [];
      words = Object.keys(this.mods[this.AY]["dislikes_WC"]);
      for (var j in words) {
        badwords.push({
          name: words[j],
          value: this.mods[this.AY]["dislikes_WC"][words[j]]
        });
      }
      this.word_cloud = goodwords;
      this.word_cloud_b = badwords;
    }
  } // end of methods brackets
};
</script>

<style scoped>
.charts {
  margin-top: 30px;
}
.echarts {
  width: 280px;
  height: 360px;
  margin: 0px;
  padding: 0px;
}

.pieandtext {
  // display:grid;
  // grid-template-columns: 1fr 1fr;
}

.textinfo {
  background: #eee;
  padding: 1em;
}
.d-flex {
  display: flex;
}

.cascading-admin-card {
  margin: 10px;
  margin-top: 10px;
}
.cascading-admin-card .admin-up {
  margin-left: 50%;
  margin-right: 4%;
  margin-top: -70px;
}
.cascading-admin-card .admin-up .fa {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
}
.cascading-admin-card .admin-up .fa {
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  margin-left: 10px;
  float: left;
  margin-top: 2rem;
  text-align: left;
}

.cascading-admin-card {
  margin-top: 0px;
}

.commentary {
  margin-top: -10px;
}

.text {
  text-align: left;
}

.moduleinfo {
  margin-top: -20px;
  text-align: left;
}

.modulebtn {
  margin-left: -15px;
}

.card[class*="border"] {
  border: 1.3px solid #2bbbad;
  box-shadow: none;
}
</style>
