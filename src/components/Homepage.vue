<template>
  <div classname="homepage">
  <div class="container">
  <div class="jumbotron" style="height:600px;">

  <img class="animated bounce infinite" src='https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/yq4o-newlogo.png'>
  <p> Enough of searching for information online just to find that they are of little help? Tired of asking seniors for information regarding academic matters? Worrying that this information might also be unreliable? </p>
  <p><b><font size="5">Fret not! VirtualSenpai! is here to help!</font></b></p>
  VirtualSenpai! is a centralised, data driven platform that empowers you with visuals to make more informed decisions. You can now have a more objective view when selecting modules and easily explore your different career prospects in greater details!</p>
   <a class="btn btn-primary btn-lg" @click="$router.push({ path: '/careerview'})" role="button">Career</a>
   <a class="btn btn-primary btn-lg" @click="$router.push({ path: '/module'})" role="button">Modules</a>
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
<style></style>
