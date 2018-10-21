<template>
<div classname="Logo">
  <img class="animated bounce infinite" src="https://mdbootstrap.com/img/logo/mdb-transparent.png">
  
  <div classname="instruction">
    <h3> Welcome to our App! </h3>
    <h4> put in some story or instructions or purpose of app here </h4>
  </div>

  <p> please click here to proceed </p>
  <div class="jumbotron p-0">

  <!-- Card image -->
  <div class="view overlay rounded-top">
    <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg" class="img-fluid" alt="Sample image">
    <a href="#">
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>

  <!-- Card content -->
  <div class="card-body text-center mb-3">

    <!-- Title -->
    <h3 class="card-title h3 my-4"><strong>Card title</strong></h3>
    <!-- Text -->
    <p class="card-text py-2">Some quick example text to build on the card title and make up the bulk of the card's</p>
    <!-- Button -->
     <router-link to="/module" tag="button"> module </router-link>
    
    <router-link to="/module">
    <btn color="success" rounded>
      <fa icon="facebook" class="mr-3"/>
      Check out VirtualSenpai!
    </btn>
    </router-link>
    
    <btn gradient="peach">Peach gradient button</btn>
    
  </div>

</div>
</div>


</template>

<script>
import { Btn, Fa } from "mdbvue";

export default {
  components: {
    Btn,
    Fa
  },
  data() {
    return {};
  }
};
</script>

// css
<style>
#instruction {
  width: 50px;
  height: 1000px;
}
</style>
