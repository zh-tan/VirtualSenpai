<template>
  <div class="homepage">
  
<section class="banner-area relative" id="home" data-parallax="scroll" data-image-src="img/header-bg.jpg">
				<div class="overlay-bg overlay"></div>
				<div class="container">
					<div class="row fullscreen  d-flex align-items-center justify-content-center" style="height: 800px;">
						<div class="banner-content col-lg-6 col-md-6">
              <img src='https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/yq4o-newlogo.png' height="150">  
              <h1>
                A centralised, data driven platform that empowers you with visuals to make more informed decisions. 
             </h1>
             
              <br> Click me to explore different modules and career prospects in greater details! <br>
              <a class="btn btn-default btn-lg" @click="$router.push({ path: '/module'})" role="button"><i class="fas fa-book mr-2"></i>Modules</a>
              <a class="btn btn-default btn-lg" @click="$router.push({ path: '/careerview'})" role="button"><i class="fas fa-graduation-cap mr-2"></i>Career</a>
						</div>												
					</div>
				</div>
			</section>

  <section class="service-area pt-100 pb-100" id="service">
      <div class="generalinfo">
				<div class="container">
            <div class="row d-flex justify-content-center">
              <div class="menu-content pb-70 col-lg-8">
                <div class="title text-center">
                <br>
                <br>
                <br>
                  <h2 class="mb-10"><b><font size="7">Why VirtualSenpai! ?</font></b></h2>
                  <br>
                  <br>
                </div>
              </div>
            </div>
					</div>	
        <b></b>
        <b></b>
					<div class="row">
						<div class="sigle-service col-lg-4 col-md-6">
							<i class="fas fa-question mr-2"></i>
							<h4>Huge dilemma </h4>
							<p>
								Find yourself constantly revolving around seniors' advices regarding academic matters? Unsure of which senior's advice to follow?
							</p>
						</div>
						<div class="sigle-service col-lg-4 col-md-6">
							<i class="fas fa-lightbulb-o mr-2"></i>
							<h4>Unequal access to information</h4>
							<p>
                Based on our survey results, many students rely on seniors for advice yet not all students have seniors to turn to!
								Knowing more seniors give students an unfair advantage in terms of unequal access to information and we want to eradicate this information inequality!
							</p>
						</div>
						<div class="sigle-service col-lg-4 col-md-4">
							<i class="fas fa-thumbs-down mr-2"></i>
							<h4>Unreliable and ineffective source of information</h4>
							<p>
								Enough of searching for information online just to find that they are of little help? Worrying that this information might also be unreliable? 
							</p>
						</div>																		
					</div>
				</div>	
			</section>
  <section>

<section class="team-area section-gap" id="team">
      <div class="presentedby">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="menu-content pb-70 col-lg-8">
							<div class="title text-center">
              <br>
              <br>
              <br>
								<h2 class="mb-10">VirtualSenpai! is proudly presented to you by Team Lambda!</h2>
							  <br>

							</div>
						</div>
					</div>						
					<div class="row justify-content-center d-flex align-items-center">
						<div class="col-md-4 single-team">
						    <div class="team-member">
						        <img class="mx-auto rounded-circle" src="https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/RSJ0-zh.jpeg" alt="">
						        <div class="align-items-center justify-content-center d-flex">
						        </div>
						    </div>
						    <div class="meta-text mt-30 text-center">
							    <h4>Zhe Hao</h4>								    	
						    </div>
						</div>
						<div class="col-md-4 single-team">
						    <div class="team-member">
						        <img class="mx-auto rounded-circle" src="https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/K2xg-tri.jpeg" alt="">
						        <div class="align-items-center justify-content-center d-flex">
						        </div>
						    </div>
						    <div class="meta-text mt-30 text-center">
							    <h4>Tricia</h4>			    	
						    </div>
						</div>	
						<div class="col-md-4 single-team">
						    <div class="team-member">
						        <img class="mx-auto rounded-circle" src="https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/pif_-wulin.jpeg" alt="">
						        <div class="align-items-center justify-content-center d-flex">
						        </div>
						    </div>
						    <div class="meta-text mt-30 text-center">
							    <h4>Wulin</h4>	    	
						    </div>
						</div>	
						<div class="col-md-4 single-team">
						    <div class="team-member">
						        <img class="mx-auto rounded-circle" src="https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/PXvj-chiran.jpeg" alt="">
						        <div class="align-items-center justify-content-center d-flex">
						        </div>
						    </div>
						    <div class="meta-text mt-30 text-center">
							    <h4>Chiran</h4>	    	
						    </div>
						</div>
            <div class="col-md-4 single-team">
						    <div class="team-member">
						        <img class="mx-auto rounded-circle" src="https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/ebvV-yy.jpeg" alt="">
						        <div class="align-items-center justify-content-center d-flex">
						        </div>
						    </div>
						    <div class="meta-text mt-30 text-center">
							    <h4>Ying Yang</h4>	    	
						    </div>
						</div>																										
				
					</div>
				</div>
      </div>	
		</section>

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

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    padding:0;
}
.generalinfo {
  background: rgba(255, 255, 255, 255);
  opacity: 1;
  border-radius: 3px;
  margin-top:0px;
  position: relative  ;
  width:100%;
  height:450px;
  padding: 0;
}
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
  opacity: 1;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin-top: 200px;
  left: 0;
  position: relative  ;
  margin-left: 0%;
  margin-right: 20px;
  right: 0;
  z-index: 2;
  padding: 0 10px;
  width: 100%;
}

.presentedby{
  background: rgba(255, 255, 255, 255);
  opacity: 0.85;
  border-radius: 3px;
  margin-top:0px;
  position: relative  ;
  width:100%;
  height:750px;
  
}
h1 {
  font-weight: bold;
  color: #fff;
  font-size: 24px;
}
h2 {
  font-weight: bold;
  font-size: 30px;
}
.img-fluid {
    max-width: 100%;
    height: auto;
}
.team-member img {
    width: 225px;
    height: 225px;
    border: 7px solid #fff;
    opacity: 1;
}
</style>
