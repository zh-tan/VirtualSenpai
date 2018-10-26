<template>
<div classname="charts">

<p> {{major}} </p>
<ul class="smooth-scroll list-unstyled">
  <li>
    <h5><a href="#piechart">Hiring Indutry</a></h5>
  </li>
  <br>
  <li>
    <h5><a href="#table">Common Roles</a></h5>
  </li>
  <br>
  <li>
    <h5><a href="#medianSalary">Median Salary</a></h5>
  </li>
  <br>
</ul> 
<div class="charts">
  <div id="piechart">
    <h4>Hiring Industries</h4>
    <pie-chart v-if="rendered"
    :data="pieChartData" 
    :options="pieChartOptions" 
    :height="300"
    :width="600"></pie-chart>
  </div>
<br>
<div id="table">
  <h4>Common Roles</h4>    
  <table id="tablePreview" class="table table-striped table-bordered">
  <!--Table head-->
    <thead>
      <tr>
        <th>Roles</th>
        <th>% of Grads</th>
        <th>Median Salary</th>
        
      </tr>
    </thead>
    <!--Table head-->
    <!--Table body-->
    <tbody>
      <tr>
        <th scope="row">Consultant</th>
        <td>22.5%</td>
        <td>4,072</td>
        
      </tr>
      <tr>
        <th scope="row">Data Analyst</th>
        <td>15.0%</td>
        <td>3,950</td>
        
      </tr>
      <tr>
        <th scope="row">Management Trainee</th>
        <td>15.0%</td>
        <td>3,483</td>
        
      </tr>
      <tr>
        <th scope="row">Marketing Assistant</th>
        <td>12.5%</td>
        <td>3,620</td>
        
      </tr>
      <tr>
        <th scope="row">Others</th>
        <td>10.0%</td>
        <td>3,825</td>
        
      </tr>
    </tbody>
    <!--Table body-->
  </table>
</div>
<div id="medianSalary">
  <h4>Median Salaries</h4>
  <line-chart :data="lineData" />
</div>
</div>
    </div>
</template>

<script>
import { db } from "../firebase";
import { PieChart, BarChart} from "mdbvue";
import IEcharts from "vue-echarts-v3/src/lite.js";
import randomcolor from "randomcolor";
import "echarts-wordcloud";
import Vue from "vue";
import careerSearch from "./careerSearch";
// mods[modulecode][semester]

var careerRef = db.ref("career/Bachelor of Arts (Architecture)");

//console.log(modRef)
export default {
  created() {
    this.major = this.$route.params.major;
  },
  mounted() {
    
    careerRef
      .once("value")
      .then(snapshot => {
        this.career = snapshot.val();
      })
      .then(() => {
        this.rendered = this.getbreakdown();
      });
    console.log("mounted" + this.career);
    
  
  },
  components: {
    IEcharts,
    PieChart,
    BarChart,
    careerSearch
  },
  data() {
    return {
      // i think this is needed to make it reactive
      // got to do with Vue Lifecycle
      rendered: false,

      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      pieChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: []
          }
        ]
      },
      lineData:[
        {name: 'Healthcare', data: {'2015': 3344, '2016': 3400, '2017': 3500, '2018': 3480}},
        {name: 'Real Estate', data: {'2015': 4001, '2016': 4100, '2017': 3889, '2018': 3609}},
        {name: 'Scientific R&D', data: {'2015': 4590, '2016': 4690, '2017': 4580, '2018': 4500}},
        {name: 'Society & Community', data: {'2015': 2900, '2016': 3000, '2017': 2390, '2018': 3148}}
        
      ]
    };
  },
  methods: {
    getbreakdown() {
      const data = this.career["industries"];
      let pielabels = [];
      let piedata = [];
      let lineData = [];

      //{name: 'Real Estate', data: {'2017': 5, '2018': 3}}
      
      for (var value in data) {
        pielabels.push(value);
        piedata.push(1);
        /*
        let tempLine = {};
        tempLine.name = value;
        tempLine.data = {};
        for(var year in data["median_sal"]){
          for(var salary in year){
            tempLine.data.year = salary
          }
        }
        lineData.push(tempLine)*/
      }
      


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

      this.rendered = true;
      this.pieChartData["labels"] = pielabels;
      this.pieChartData["datasets"][0]["data"] = piedata;
      //this.piedata = piedata;
      console.log(this.pieChartData);
      console.log(this.pieChartOptions)
      
      return true;
    }
  }
}
</script>
<style scoped>
/*.charts{
  display:grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-template-rows: auto auto auto auto
}
.piechart{
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}
.table{
  grid-column: 4 / 6;
  grid-row: 1 / 3;
}
.medianSalary{
  grid-column: 1/4;
}*/
</style>