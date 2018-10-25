<template>
<div classname="charts">

<p>{{pieoptions1}} </p> 
{{rendered}}
<h1> HIII</h1>
<pie-chart v-if="rendered"
:data="piedata1" :options="Object" :height="200"></pie-chart>

    </div>
</template>

<script>
import { db } from "../firebase";
import { GChart } from "vue-google-charts";
import { PieChart } from "mdbvue";
import Vue from "vue";
// mods[modulecode][semester]
var modRef = db.ref("mods/ACC1002");

//console.log(modRef)
export default {
  components:{
    GChart
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
      pieChartData: {
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
      }
    };
  },
  methods:{
    getbreakdown(){
        const data = this.mods["1810"]["cohort"];
        let piedata = [["Course", "Number"]];
        for(var value in data){
          piedata.push( [value,data[value]] ) //list of list
        }
      this.piedata = piedata;
      return true;          
    }
  }
};
</script>
