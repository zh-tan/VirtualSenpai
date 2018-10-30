<template>
<div classname="charts">
<div class = "page-header">
   <h1>
      {{careerTitle}}
   </h1>
</div>

<row>

<div class="charts">

  <column md="auto">
  <row>
    <column lx="4">
    <card cascade class="cascading-admin-card">
      <div class="piechart">
      <card-header class="text-left">Hiring industries </card-header>
      <card-body>
      <pie-chart v-if="rendered"
      :data="pieChartData" 
      :options="pieChartOptions" 
      :height="420"
      :width="600"></pie-chart>
      </card-body>
      </div>
    </card>
    </column>
    <column lx="4">
    <card>
      <div class="table table-sm">
        <card-header class="text-left">Common Roles</card-header>
        <card-body>    
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
        </card-body>
      </div>
      </card>
      </column>
      <!-- put the unpreparedness here -->
      <column lx="4">
  <div class="view overlay">
    <card>
  <card-header class="text-left">Areas of Improvement</card-header>
  <div class="d-flex justify-content-around">
  <div class="w-30 p-3">
  
  <row>
  <div class="card card-cascade wider">
  <!-- Card image -->
  <div class="view view-cascade overlay">
    <h2><span class="badge red">{{top3Skills[0]}}</span></h2>
    <a href="#!">
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>
  <!-- Card content -->
  <div class="card-body card-body-cascade text-center">
    <!-- Title -->
    <h4 class="card-title"><strong>{{top3Scores[0].toFixed(1)}} / 5</strong></h4>
    <!-- <h5 class="blue-text pb-2"><strong>3.5/5</strong></h5> -->
  </div>
  </div>
  </row>
  <br>
  <row>
  <div class="card card-cascade wider">
  
  <div class="view view-cascade overlay">
    <h2><span class="badge red">{{top3Skills[1]}}</span></h2>
    <a href="#!">
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>
  <!-- Card content -->
  <div class="card-body card-body-cascade text-center">
    <!-- Title -->
    <h4 class="card-title"><strong>{{top3Scores[1].toFixed(1)}} / 5</strong></h4>
    <!-- <h5 class="blue-text pb-2"><strong>3.5/5</strong></h5> -->
  </div>
  </div>
  </row>
  <br>
  <row>
  <div class="card card-cascade wider">
  <!-- Card image -->
  <div class="view view-cascade overlay">
    <h2><span class="badge red">{{top3Skills[2]}}</span></h2>
    <a href="#!">
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>
  <!-- Card content -->
  <div class="card-body card-body-cascade text-center">
    <!-- Title -->
    <h4 class="card-title"><strong>{{top3Scores[2].toFixed(1)}} / 5</strong></h4>
    <!-- <h5 class="blue-text pb-2"><strong>3.5/5</strong></h5> -->
  </div>
  </div>
  </row>
  </div>
  </div>
  </card>
    <div class="mask flex-center rgba-red-strong">
        <p class="white-text flex-center">
        This section shows the scores of the top 3 skills that graduates of {{this.careerTitle}} felt they were the most lacking in when they entered the workforce
        <br>
        A higher score for a skill shows that for this skill, graduates were more unprepared for it
        </p>
    </div>
</div>
</column>
  </row>
  <row>
    <br>
  </row>
  <row>
    <column lx="6">
    <card>
      <card-header class="text-left">Median Salaries</card-header>
      <card-body>
      <div class="d-flex justify-content-center" style="display:block">
      <line-chart :data="salaryData" width="400px" height="250px"/>
      </div>
      </card-body>
    </card>
    </column>
    <column lx="6">
    <card>
      <card-header class="text-left">Hiring Volume</card-header>
      <card-body>
        <div class="d-flex justify-content-center" style="display:block">
        <line-chart :data="hiringData" width="400px" height="250px"/>
        </div>
      </card-body>
    </card>
    </column>
  </row>
  </column>

</div>

</row>
    </div>
</template>

<script>
import { db } from "../firebase";
import IEcharts from "vue-echarts-v3/src/lite.js";
import randomcolor from "randomcolor";
import "echarts-wordcloud";
import Vue from "vue";
import careerSearch from "./careerSearch";
import {
  Row,
  Column,
  Btn,
  Fa,
  PieChart,
  BarChart,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle
} from "mdbvue";
// mods[modulecode][semester]


console.log("Getting the ref ");
//console.log(modRef)
export default {
  created() {
    this.careerTitle = this.$route.params.careerTitle;
    this.careerRef = db.ref("career/" + this.careerTitle);
    console.log("Getting the title ");
  },
  mounted() {
    this.careerRef
      .once("value")
      .then(snapshot => {
        this.career = snapshot.val();
      })
      .then(() => {
        this.rendered = this.getbreakdown();
      });
  },
  components: {
    Row,
    Column,
    Btn,
    Fa,
    PieChart,
    BarChart,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardText,
    careerSearch
  },
  data() {
    return {
      // i think this is needed to make it reactive
      // got to do with Vue Lifecycle
      top3Skills: [],
      top3Scores:[],
      rendered: false,
      careerRef:[],
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      pieChartData: {},
      salaryData: [],
      hiringData: []
    };
  },
  methods: {
    getbreakdown() {

      let pielabels = [];
      let piedata = [];
      let lineData = [];
      let industryObjects =[];

      let ranking = {};
      //This line below gets all the industry names for this major
      const data = this.career["industries"];
      const preparedness = this.career["preparedness"]

      
      for(var year in preparedness){
        for(var k in preparedness[year]){
          ranking[preparedness[year][k][0]]=preparedness[year][k][1]
        }
      }

      // Create items array
      var sortRanking = Object.keys(ranking).map(function(key) {
        return [key, ranking[key]];
      });

      // Sort the array based on the second element
      sortRanking.sort(function(first, second) {
        return second[1] - first[1];
      });
      
      const top3Ranking = {};
      var count = 0
      for(var i in sortRanking){
        top3Ranking[sortRanking[i][0]] = sortRanking[i][1]
        count++
        if(count===3){
          break;
        }
      }
      for(var i in top3Ranking){
        this.top3Skills.push(i)
        this.top3Scores.push(top3Ranking[i])
      }

      for (var value in data) {
        pielabels.push(value);
      }
      //this.salaryData
      industryObjects.push(this.career["industries"])
      
      let medianSalary = [];
      let hiring = [];
      /*{
          name: "Healthcare",
          data: { "2015": 33, "2016": 34, "2017": 35, "2018": 34 }
        }*/
      for(var name in pielabels){
        var oneSal = {}
        var oneHire = {}
        oneSal["name"]=pielabels[name]
        oneHire["name"]=pielabels[name]
        oneSal["data"]=this.career["industries"][pielabels[name]]["median_sal"]
        oneHire["data"]=this.career["industries"][pielabels[name]]["hiringCount"]
        medianSalary.push(oneSal)
        hiring.push(oneHire)
      }
      
      this.salaryData=medianSalary
      this.hiringData=hiring

      var industries = industryObjects[0]
      let industryList = [];
      for(var i in industries){
        industryList.push(industries[i])
      }
      
      let hiringCount = [];
      
      
      for(var attribute in industryList){
        var thisIndustry = (industryList[attribute]["hiringCount"])
        
        
        var count = 0
        for(var year in thisIndustry){
          count = count + thisIndustry[year]
          
        }
        hiringCount.push(count)
      }
      
      for(var key in hiringCount){
        piedata.push(hiringCount[key])
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
              "#ac64ad",
              "#4f49eb",
              "#4cec04",
              "#77c019",
              "#86c0d1",
              "#ed4689"
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
     

      return true;
    }
  }
};
</script>
<style scoped>
/*.charts{
  display:grid;
  grid-template-columns: 1fx 1fx 1fx;
  grid-template-rows: auto
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
