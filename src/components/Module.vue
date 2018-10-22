<template>
<div classname="charts">



 <GChart
      type="PieChart"
      :data="piedata1"
      :options="chartOptions"
    />    
    </div>
</template>

<script>
import { db } from "../firebase";
import { GChart } from "vue-google-charts";
import Vue from 'vue';
// mods[modulecode][semester]
var modRef = db.ref("mods");

//console.log(modRef)
export default {
  props:{
    piedata1:{
      type: Array,
      default: () => {return []} // object 
    },
    chartOptions1: {
        chart: {
          title: "Demographic breakdown",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      }
  },
  components:{
    GChart
  },
  data() {
    return {
      // i think this is needed to make it reactive
      // got to do with Vue Lifecycle
      mods: {},
      piedata: [],
      chartOptions: {
        chart: {
          title: "Demographic breakdown",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      }
    };
  },
  methods:{
    getbreakdown(){
        const data = this.mods["ACC1002"]["1810"]["cohort"];
        let piedata = [["Course", "Number"]];
        for(var value in data){
          piedata.push( [value,data[value]] ) //list of list
        }
      this.piedata = piedata;          
    }
  }
};
</script>
