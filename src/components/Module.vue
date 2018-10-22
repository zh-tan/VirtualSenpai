<template>
<div classname="charts">

<p>{{test}} </p>
 <GChart v-if="rendered"
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
