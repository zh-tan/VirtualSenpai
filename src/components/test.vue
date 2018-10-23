<template>
<div id="testing">
  <div>
  sidebar
  </div>
  <div>search bar here</div>
  
  <div style="grid-column: 2/3">mods here 
  <router-link :to="{ path : 'module', params:{rendered: true}}">Module</router-link>
  </div>

</div>
</template>
<script>
import { db } from "../firebase";

export default {
  name: "HelloWorld",
  data() {
    return {
      tests: {}
    };
  },
  firebase: {
    tests: {
      source: db.ref("test")
      }
    }
}
</script>
<style>
#testing{
  display:grid;
  grid-template-columns: 100px 1fr;
  grid-auto-rows: minmax(20px, auto);
}
</style>
