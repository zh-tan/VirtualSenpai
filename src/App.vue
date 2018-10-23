<template>
  <div id="app">
  <NavPage style="grid-column: 1/3"></NavPage>
    <router-view/>
    
  
  </div>
</template>

<script>
import NavPage from "./components/NavPage";
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
  margin-top: 60px;
  display:grid;
  grid-auto-rows: minmax(40px, auto);
}


</style>
