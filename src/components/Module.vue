<template>
<div class="charts">
 <div class="pieandtext">
  <div class="textinfo">
  <h6 :style="{textDecoration: 'underline'}"> Average Rating</h6>
  <h2> <span v-bind:style="spancolor"> {{avg_rating}}  / <b>5</b> </span> </h2>
  <h5>  {{opinion_rating}} </h5>
  </div>
  <div class="piechart">
    <pie-chart ref="PC"
      v-if="rendered"
      :data="pieChartData" 
      :options="pieChartOptions" 
      :height="200">
      </pie-chart>
  </div>
  </div>
  
   <div>
    <wordcloud
      :data="word_cloud"
      nameKey="name"
      valueKey="value">
      :
      </wordcloud>
  </div>  
  

  <div class="barchart">
    <bar-chart 
      v-if="rendered"
      :data="gradesdistdata" 
      :options="gradedistoptions" 
      :height="300"
      :width="600">
      </bar-chart>
  </div>

   <div>
    <wordcloud
      :data="word_cloud_b"
      nameKey="name"
      valueKey="value">
      </wordcloud>
  </div>
  <div>
  <p v-for="sem in AYList" @click="refreshAY(sem)">{{sem}}</p>
  </div>

</div>
</template>

<script>
import { db } from "../firebase";
import { PieChart, BarChart} from "mdbvue";
import IEcharts from 'vue-echarts-v3/src/lite.js';
import randomcolor from 'randomcolor';
import wordcloud from 'vue-wordcloud';

import Vue from "vue";
// mods[modulecode][semester]


//console.log(modRef)
export default {
  created(){
  this.modCode=this.$route.params.modCode;
  this.modRef = db.ref("mods/"+this.modCode);
  },
  mounted(){
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
  },
  props: {
  },
  components: {
    PieChart,
    BarChart,
    wordcloud
  },
  data() {
    return {
      //need a method to dynamically select latest
      //available AY
      modRef: {},
      AYList:[],
      AY: "2018-S1",
      word_cloud: [],
      test :[],
      word_cloud_b: [],
      ins: null,
      echarts: null,
      mods: {},
      pieChartOptions: {},
      pieChartData: {},
      gradesdistdata: {},
      gradedistoptions: {},
      rendered: false,
      avg_rating: "",
      opinion_rating: "",
      spancolor: ""
    };
  },
  computed:{
  },
  methods: {
    toggle(){

      this.rendered=false;
      setTimeout(()=>{
              this.rendered=true;
       },1);
    },
    getAY(){
      this.AYList = Object.keys(this.mods);
      this.AYList.sort();
      this.AYList.reverse();
      this.AY=this.AYList[0];
    },

    refreshAY: function(year){
      this.AY=year;
      this.getbreakdown();
      this.gradesdist();
      this.avg_rating = this.avgrating();
      this.opinion_rating = this.opinionrating();
      this.get_words();
      this.toggle();
    },
    avgrating(){
      const test = this.mods[this.AY]["avr_rating"];
      if (test >3.5){
        this.spancolor = "color:lightgreen";
      } else if (test > 2.5) {
        this.spancolor = "color:orange";
      } else {
        this.spancolor = "color:red";
      }
      //console.log(this.mods[this.AY]["opinion"]);
      return test;
    },
    opinionrating(){
      // dictionary of values {Excellent: 0.5, Average: 0.5}
      const values = this.mods[this.AY]["opinion"];
      //console.log(values["Average"]);
      var output = "";
      var counter = 0;
      // loop through maximum from Excellent to Poor
      for(var x in values){
          if("Excellent" in values){
            //console.log("here");
            output += values["Excellent"]*100 + "% rated Excellent"; 
          } else if ("Good" in values){
            output += values["Good"]*100 + "% rated Good";
          } else if ("Average" in values){
            //console.log("here")
            output += values["Average"]*100 + "% rated Average";
          } else if ("Below Average" in values){
            output += values["Below Average"]*100 + "% rated Below Average";
          } else if ("Poor" in values){
            output += values["Poor"]*100 + "% rated Poor";
          }
          counter++;
          
          output += "\n";
          // to show top 2 values
          if(output.size == 2){
            break;
          }
      }
      console.log(output);
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
      console.log(this.pieChartData);
      console.log(this.AY);
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
        "F":0, 
        "E":1,
        "D":2,
        "C-":3,
        "C":4,
        "C+":5,
        "B-":6,
        "B":7,
        "B+":8,
        "A-":9,
        "A":10,
        "A+":11}

      const data = this.mods[this.AY]["grades"];
      const dataset = [];
      const percourse = {};

      for (var course in data){
        const gradescount = [0,0,0,0,0,0,0,0,0,0,0,0];
        // count the number of grades in each course
        for(var lettergrade in data[course]){
          // find index through mapping to increase count
          const idx = idxmap[lettergrade];
          //console.log(lettergrade);
          gradescount[idx] += 1;
        }
        // append to datasets to contain standard format
        dataset.push({
          label: course,
          data: gradescount,
          backgroundColor: '#D6E9C6' // green
        })
      } // end of outer for loop

      // reinitialise dataset so that charts will re-render
      this.gradesdistdata = {
        labels: grades,
        datasets: dataset
      };

      this.gradedistoptions = {
        scales: {
        xAxes: [{ stacked: true }],
        yAxes: [{ stacked: true }]},
    }
    this.rendered=true;
    },
    get_words(){
      var goodwords=[];
      var words =Object.keys(this.mods[this.AY]["likes_WC"])
      for(var i in words){
        goodwords.push({"name":words[i],"value":this.mods[this.AY]["likes_WC"][words[i]]});
      }
      var badwords=[]
      words =Object.keys(this.mods[this.AY]["dislikes_WC"])
      for(var j in words){
        badwords.push({"name":words[j],"value":this.mods[this.AY]["dislikes_WC"][words[j]]});
      }
      this.word_cloud=goodwords;
      this.word_cloud_b=badwords;
    }

  } // end of methods brackets

};
</script>


<style>
.charts{
  display:grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto; 
  //grid-auto-rows: minmax(100px, auto);
  grid-row-gap: 1em;
}

.pieandtext{
  display:grid;
  grid-template-columns: 1fr 1fr;

}

.textinfo{
  background:#eee;
  padding:1em;

}

wordcloud{
  border-color: black;
}

</style>