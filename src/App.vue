<template>
  <div id="app">
  <NavPage id="bar"></NavPage>
  <router-view style="grid-column:1/3"/>
    
  
  </div>
</template>



<script>
import NavPage from "./components/NavPage";
import test from "./components/test";
import Homepage from "./components/Homepage";
export default {
  name: "App",
  components: {
    NavPage
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(40px, auto);
}
#bar{
  grid-column: 1/3
}

</style>
