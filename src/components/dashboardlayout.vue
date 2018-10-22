<template>
<div classname="layout">
<p> {{mods}} </p>
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
var testref = db.ref("mods");

export default {
  name: "Layout",
  components: {
    GChart,
    NavPage,
    Module
  },
  created() {
    //this.update();
    console.log("create");
  },
  mounted() {
    console.log("mounted");
  },
  beforeMount: async function() {
    //this.getbreakdown();
    this.getbreakdown();
    console.log("b4 mount" + this.x);
  },
  updated(){
    //this.getbreakdown();
    console.log("update");
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
  // firebase: {
  //   mods: {
  //     // change the "test" to desired path
  //     source: db.ref("mods"),
  //     asObject: false,
  //     // to throw back error
  //     cancelCallback(err) {
  //       console.error(err);
  //     }
  //     // readyCallback(){
  //     //   //this.mods = this.mods.toString();
  //     //   console.log("here123" + this.mods)
  //     // }
  //   }
  // },
  methods: {
    update: async function(){
      this.mods = db.ref("mods");
      console.log("update"+ this.mods)
    },
    async getbreakdown() {
      // try making it async
    
      let res = await fetch("https://virtualsenpai-71ac3.firebaseio.com/mods.json");
        console.log("method" + res);
      let json = await res.json();
      console.log("after method" + json);

      const data = this.mods["ACC1002"]["1810"]["cohort"];
      let piedata = [["Course", "Number"]];
      for (var value in data) {
        piedata.push([value, data[value]]); //list of list
      }
      this.piedata = piedata;
     
     return piedata;
      
    }
  }
};
</script>
