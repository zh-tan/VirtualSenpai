<template>
<div classname="charts">

<p> {{modCode}} </p> 
  <div id="echarts">
    <IEcharts
      :option='wordcloud'
      @ready='onReady'
    />
    </div>

<pie-chart v-if="rendered"
:data="pieChartData" :options="pieChartOptions" :height="200"></pie-chart>
    

<bar-chart v-if="rendered"
:data="gradesdistdata" :options="gradedistoptions" :height="200"></bar-chart>
    
    </div>
</template>

<script>
import { db } from "../firebase";
import { PieChart, BarChart } from "mdbvue";
import IEcharts from 'vue-echarts-v3/src/lite.js';
import randomcolor from 'randomcolor';
import 'echarts-wordcloud';
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
        this.rendered = this.getbreakdown();
        this.gradesdist();
      });
  },
  props: {
    // piedata1: Object,
    // pieoptions1: Object,
    // rendered: Boolean,
    // gradesdist: Object,
    // gradesdistoptions: Object  
  },
  components: {
    IEcharts,
    PieChart,
    BarChart
  },
  data() {
    return {
      // i think this is needed to make it reactive
      // got to do with Vue Lifecycle
      modRef: {},
      wordcloud: {},
       ins: null,
      echarts: null,
      mods: {},
      pieChartOptions: {},
      pieChartData: {},
      gradesdistdata: {},
      gradedistoptions: {},
      rendered: false
    };
  },
  methods: {
    // method for wordcloud to initialise
      onReady (instance, echarts) {
      const that = this
      that.ins = instance
      that.echarts = echarts
      that.wordcloud = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'click',
            formatter: "x"
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [17, 50],
            rotationRange: [-90, 90],
            shape: 'circle',
            width: 2000,
            height: 1000,
            drawOutOfBound: true,
            textStyle: {
              normal: {
                color: randomcolor
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: [
            {"name":"YY",
            "value": 30},
            {"name":"ZH",
            "value": 20},
            {"name": "Chiran",
            "value": 100}
            ]
          }
        ]
      }
    },
    // method for piechart to initialise
    getbreakdown() {
      const data = this.mods["2018-S1"]["cohort"];
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
      return true;
    },

    // method for barchart to initialise
    gradesdist() {
      const AY = "2017-S2";
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

      const data = this.mods[AY]["grades"];
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
        yAxes: [{ stacked: true }]
  }
}}
  } // end of methods brackets
};
</script>
