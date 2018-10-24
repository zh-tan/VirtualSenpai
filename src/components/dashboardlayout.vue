<template>
<div classname="layout">
<p></p>
  <NavPage></NavPage>

  <Module 
    :piedata1="pieChartData"
    :pieoptions1="pieChartOptions"
    :rendered="rendered"
    :gradesdist="gradesdistdata">
    </Module>
    
</div>
</template>

<script>
import { db } from "../firebase";
import Vue from "vue";
import Module from "./Module";
import NavPage from "./NavPage";
// mods[modulecode][semester]
var modRef = db.ref("mods/ACC1002");

export default {
  name: "Layout",
  components: {
    NavPage,
    Module
  },
  mounted() {
    modRef
      .once("value")
      .then(snapshot => {
        this.mods = snapshot.val();
      })
      .then(() => {
        this.rendered = this.getbreakdown();
        this.gradesdist();
      });
    console.log("mounted" + this.mods);
  },
  data() {
    return {
      // i think this is needed to make it reactive
      // got to do with Vue Lifecycle
      mods: {},
      piedata: [],
      rendered: false,
      chartOptions: {
        chart: {
          title: "Demographic breakdown",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      pieChartData: {},
      gradesdistdata: {},
      gradedistoptions: {}
    };
  },
  methods: {
    getbreakdown() {
      const data = this.mods["2018-S1"]["cohort"];
      let pielabels = [];
      let piedata = [];

      for (var value in data) {
        pielabels.push(value);
        piedata.push(data[value]);
      }
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

    }
  };
</script>
