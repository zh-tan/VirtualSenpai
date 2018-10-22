<template>
<div classname="layout">
<p> {{piedata}} </p>
  <NavPage></NavPage>

  <Module 
    :piedata1="piedata"
    :chartOptions1="chartOptions.chart"></Module>
    
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
      chartOptions: {
        chart: {
          title: "Demographic breakdown",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      }
    };
  },
  methods: {
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
