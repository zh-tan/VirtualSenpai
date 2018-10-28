<template>
<div>
<h1>Select a Degree Program</h1>
<select  @change="$router.push({ path: '/careerview/'+prog})" v-model="prog">
  <option v-for="deg in majors" :key="deg">
  {{deg}}
  </option>
</select><br>
<div style="height: 1000px">
</div>
</div>
</template>


<script>
import { db } from "../firebase";
//db ref mods and extract module name and summaries
export default {
  name: "careerSearch",
  data() {
    return {
      majors: [],

      major: this.prog
    };
  },
  mounted() {
    db.ref("majors_list")
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      })
      .then(result => {
        this.majors = result;
      });
  },
  firebase: {}
};
</script>
