<template>
  <div id="app">
    <div id="bar">topbar component here</div>
    <router-view/>
    
  
  </div>
</template>



<script>
import test from "./components/test";
import Homepage from "./components/Homepage";
export default {
  name: "App",
  components: {
    test,
    Homepage
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
  margin-top: 60px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(40px, auto);
}
#bar{
  grid-column: 1/3
}

</style>
