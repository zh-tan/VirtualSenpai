<template>
  <div id="app">
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
}
</style>
