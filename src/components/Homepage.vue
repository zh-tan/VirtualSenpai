<template>
  <div class="homepage" :style="{ backgroundImage: 'url(' + image + ')'}">

  <div class='container'>
  <img class="animated bounce infinite" src='https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/yq4o-newlogo.png'>
  <p> Enough of searching for information online just to find that they are of little help? Tired of asking seniors for information regarding academic matters? Worrying that this information might also be unreliable? </p>
  <p><b><font size="5">Fret not! VirtualSenpai! is here to help!</font></b></p>
  VirtualSenpai! is a centralised, data driven platform that empowers you with visuals to make more informed decisions. You can now have a more objective view when selecting modules and easily explore your different career prospects in greater details!</p>
   <a class="btn btn-default btn-lg" @click="$router.push({ path: '/careerview'})" role="button"><i class="fas fa-graduation-cap mr-2"></i>Career</a>
   <a class="btn btn-default btn-lg" @click="$router.push({ path: '/module'})" role="button"><i class="fas fa-book mr-2"></i>Modules</a>
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
    return {
      image: "https://uploads.codesandbox.io/uploads/user/e6772621-92a7-441c-9d05-9ee39758af11/DvdV-vue-js-hex-colors-gradient-background.png"
    };
  }
};
</script>
<style>
.homepage{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 0;
}
.container{

width: 600px;
margin-left: auto;
margin-right: auto;
margin-top: 200px;
}
</style>
