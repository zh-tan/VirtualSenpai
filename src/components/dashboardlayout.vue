<template>
<div classname="layout">
<p> {{pieChartData}} </p>

  <Module 
    :piedata1="pieChartData"
    :pieoptions1="pieChartOptions"
    :rendered="rendered">
    
    </Module>
    
</div>
</template>

<script>
import { db } from "../firebase";
import { GChart } from "vue-google-charts";
import Vue from "vue";
import Module from "./Module";
import NavPage from "./NavPage";
// mods[modulecode][semester]
var modRef = db.ref("mods/ACC1002");

export default {
  name: "Layout",
  components: {
    GChart,
    NavPage,
    Module
  },
    mounted(){
    modRef.once("value").then((snapshot)=>{
     this.mods = snapshot.val();
    }).then(()=>{
      this.rendered=this.getbreakdown();})
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
      pieChartData: {}
    };
  },
  methods: {
    getbreakdown(){
        const data = this.mods["1810"]["cohort"];
        let pielabels = []
        let piedata = [];
        
        for(var value in data){
          pielabels.push(value);
          piedata.push(data[value]); 
        }
        //altering the element would trigger a rerender?
      this.pieChartData ={
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
          }
        ]
      };

      //this.rendered = true;
      this.pieChartData["labels"] = pielabels;
      this.pieChartData["datasets"][0]["data"] = piedata;
      //this.piedata = piedata;  
      console.log(this.pieChartData)
      return true;       
    }
  }
};
</script>
