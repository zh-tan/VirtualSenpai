<template>
<div classname="charts">

<p>{{test}} </p>


 <GChart
      type="PieChart"
      :data="piedata"
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
  components:{
    GChart
  },
  created(){
    console.log("create");
  },
    mounted(){
    console.log("mounted" + this.mods);
  },
  beforeMount(){
    this.getbreakdown();
    console.log("b4 mount" + this.test);
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
  firebase: {
    mods: {
      // change the "test" to desired path
      source: db.ref("mods"),
      asObject: true,
      // to throw back error
      cancelCallback(err) {
        console.error(err);
      }
    }
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
