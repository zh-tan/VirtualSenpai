<template>
<div class="charts">

<row >
    <column xl="6" md="6" class="mb-r">
    <div class="module" style="height:90px">
          <card cascade class="cascading-admin-card">
          <card-header class="text-left">Module Information </card-header>
            <div class="admin-up">
              <fa icon="line-chart" class="warning-color"/>
              <div class="data">
              </div>
            </div>
            <card-body>
              <p> {{modCode}}:  {{mod_name}}</p>
            <select  @change="refreshAY(curSem)" v-model="curSem">
              <option v-for="sem in AYList" :key="sem">
              {{sem}}
              </option>
            </select>
            </card-body>
          </card>
          </div>
    </column>

 <column xl="3" md="6">
          <card cascade class="cascading-admin-card">
          <card-header class="text-left">Average Rating </card-header>
            <div class="admin-up">
              <fa icon="line-chart" class="warning-color"/>

            </div>
                          <div class="data">
  <h4> <span v-bind:style="spancolor"> {{avg_rating}}  / <b>5</b> </span> </h4>
              </div>
            <div style="height: 70px">
            <card-body>
            <div class="commentary">

            <div> <b-progress :value="avg_rating" :max="5" :variant="avg_rating_bar" animated></b-progress> </div>

              <card-text>{{avg_rating_commentary}} </card-text>
              </div>
            </card-body>
            </div>
          </card>
  </column>
  
  <column xl="3" md="6" class="mb-r">
          <card cascade class="cascading-admin-card">
          <card-header class="text-left"> Opinion Rating </card-header>
            <div class="admin-up">
              <fa icon="pie-chart" class="light-blue lighten-1"/>

            </div>
                          <div class="data">
                  
                  <strong>  {{opinion_rating}} </strong>
                
              </div>
            <card-body>
                <b-progress class="mt-1" :max="100" show-value>
                  <b-progress-bar :value="opinion_rating_bad" variant="danger"></b-progress-bar>
                  <b-progress-bar :value="opinion_rating_average" variant="warning"></b-progress-bar>
                  <b-progress-bar :value="opinion_rating_good" variant="success"></b-progress-bar>
                  
                </b-progress>

              <card-text>Worse than last week (75%)</card-text>
            </card-body>
          </card>
  </column>

</row>

  <row>
    <column xl="6" md="6">
  <card cascade class="cascading-admin-card">
   <card-header class="text-left">Cohort Breakdown </card-header>
  <card-body>
  <div class="piechart">
    <pie-chart ref="PC"
      v-if="rendered"
      :data="pieChartData" 
      :options="pieChartOptions" 
      :height="150">
      </pie-chart>
  </div>
  
   <div class="barchart">
    <bar-chart 
      v-if="rendered"
      :data="gradesdistdata" 
      :options="gradedistoptions" 
      :height="200"
      :width="600">
      </bar-chart>
  </div>

  </card-body>
  </card>
    </column>

    <column>
      <card class="mb-4">
        <card-header class="text-left"> Positive Feedback </card-header>
        <card-body>
          <div>
          <wordcloud
            :data="word_cloud"
            nameKey="name"
            valueKey="value">
            :
            </wordcloud>
        </div>  
        </card-body>
    </card>
   
  </column>

<column>
<card class="mb-4">
          <card-header class="text-left"> Negative Feedback </card-header>
          <card-body>
            <div>
              <wordcloud
                :data="word_cloud_b"
                nameKey="name"
                valueKey="value">
                </wordcloud>
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
import wordcloud from "vue-wordcloud";
import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
// mods[modulecode][semester]

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
        this.rendered = this.getbreakdown();
        this.gradesdist();
        this.avg_rating = this.avgrating();
        this.opinion_rating = this.opinionrating();
        this.get_words();
      });
      db.ref("mod_summary/" + this.modCode)
      .once("value").then(snapshot=>{
        this.mod_name=snapshot.val().mod_name;
      });
  },
  props: {},
  components: {
    Row,
    Column,
    Btn,
    Fa,
    PieChart,
    BarChart,
    wordcloud,
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
      AY: "2018-S1",
      word_cloud: [],
      test: [],
      word_cloud_b: [],
      ins: null,
      echarts: null,
      mods: {},
      mod_name:"" ,
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
      opinion_rating_bad: ""
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
    }
  },
  methods: {
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
          output += values["Very good"] * 100 + "% rated Very good";
        } else if ("Good" in values && !visited.includes("Good")) {
          visited.push("Good");
          this.total_opinion_rating["good"] += values["Good"];
          output += values["Good"] * 100 + "% rated Good";
        } else if ("Average" in values && !visited.includes("Average")) {
          //console.log("here")
          this.total_opinion_rating["average"] += values["Average"];
          visited.push("Average");
          output += values["Average"] * 100 + "% rated Average";
        } else if (
          "Below average" in values &&
          !visited.includes("Below average")
        ) {
          this.total_opinion_rating["bad"] += values["Below average"];
          visited.push("Below average");
          output += values["Below average"] * 100 + "% rated Below average";
        } else if ("Poor" in values && !visited.includes("Poor")) {
          this.total_opinion_rating["bad"] += values["Poor"];
          visited.push("Poor");
          output += values["Poor"] * 100 + "% rated Poor";
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
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#ac64ad"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774",
              "#da92db"
            ]
          }
        ]
      };

      //this.rendered = true;
      this.pieChartData["labels"] = pielabels;
      this.pieChartData["datasets"][0]["data"] = piedata;
      //this.piedata = piedata;
      // console.log(this.pieChartData);
      // console.log(this.AY);
      return true;
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
          backgroundColor: "#D6E9C6" // green
        });
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
  // display:grid;
  // grid-template-columns: 2fr 1fr;
  // grid-template-rows: auto auto;
  // //grid-auto-rows: minmax(100px, auto);
  // grid-row-gap: 1em;
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
  margin-top: -25px;
}

wordcloud {
  border-color: black;
}
</style>
