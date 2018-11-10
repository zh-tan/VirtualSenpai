<template>
  <div class="homepage">

  <section>
  <div class='Title'>
  <img class="animated bounce infinite" src='https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/yq4o-newlogo.png'>
  
  <div class="row">
  </div>
  <div class="catchyinfo">
  <h2> Senior's Dilemma </h2>
  Do you find yourself constantly revolving around senior's advice? <br>
  Or unsure of which senior's advice to follow? <br>
<h3> Tired of being stuck in this dilemma? </h3>
  </div>

  </div>

  


    <div class="content">
  <h2> Background </h2>
  Based on our survey results and interviews, seniors' advices are an essential part of uni life. 
  These advices are of such paramount importance that it could decide a student's fate between a First Class Honours and a Second Uppers or finding a job in their desired field!
 
  <br> <br>

  Students who know more Seniors can have an unfair advantage in terms of unequal knowledge of information. As fellow students of NUS, we heard you and we want to eradicate this information inequality!!

  <br> <br>
  <p> Enough of searching for information online just to find that they are of little help? Tired of asking seniors for information regarding academic matters? Worrying that this information might also be unreliable? </p>
 
  </div>
 

  <div class="explore">

   <p><b><font size="5">Fret not! VirtualSenpai! is here to help!</font></b></p>
  VirtualSenpai! is a centralised, data driven platform that empowers you with visuals to make more informed decisions. You can now have a more objective view when selecting modules and easily explore your different career prospects in greater details!</p>
   <br> Click me to explore! <br>
   <a class="btn btn-default btn-lg" @click="$router.push({ path: '/module'})" role="button"><i class="fas fa-book mr-2"></i>Modules</a>
   <a class="btn btn-default btn-lg" @click="$router.push({ path: '/careerview'})" role="button"><i class="fas fa-graduation-cap mr-2"></i>Career</a>
   
  </div>


  <div class="presentedby">
  <h2> This app is proudly presented to you by Team Lambda! </h2>
<br> <br>
  Put our 5 faces here. put a more professional image so next time we can show job interview or whatever
  
  </div>
  </section>
  </div>
</template>
<script>
import { Btn, Fa } from "mdbvue";
import image from '../assets/clouds-cold-dark-540518.png';

export default {
  components: {
    Btn,
    Fa,
    image
  },
  data() {
    return {
      image: "https://uploads.codesandbox.io/uploads/user/dd765973-f46f-483a-b5f6-a5c9e6d70786/vnnw-Nature-Background-HD.jpg"
    };
  }
};
</script>
<style>

.catchyinfo {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin-top: 50px;
  text-align: centre;
  left: 0;
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  right: 0;
  z-index: 2;
  padding: 0 10px;
  width: 700px;
}

.content {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin-top: 150px;
  left: 0;
  position: relative ;
  margin-left: 20px;
  margin-right: 20px;
  right: 0;
  z-index: 2;
  padding: 0 10px;
  width: 700px;
}

.explore {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin-top: 200px;
  left: 0;
  position: relative  ;
  margin-left: 35%;
  margin-right: 20px;
  right: 0;
  z-index: 2;
  padding: 0 10px;
  width: 600px;
}

.presentedby{
  background: rgba(255, 255, 255, 255);
  opacity: 0.85;
  border-radius: 3px;
  margin-top:50px;
  position: relative  ;
  width:100%;
  height:200px;
  
}
</style>
