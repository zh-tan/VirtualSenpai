<template>
<div>
<h1>career search</h1>
<router-link :to="{ path : '/careerview/' +'Bachelor of Arts (Architecture)'}">
  Bachelor of Arts (Architecture)
</router-link><br>
<select  @change="$router.push({ path: '/careerview/'+prog})" v-model="prog">
  <option v-for="deg in majors" :key="deg">
  {{deg}}
  </option>

</select><br>
<button@click="$router.push({ path: '/careerview/'+'Bachelor of Arts (Architecture)'})">abc</button>
</div>
</template>


<script>
import { db } from "../firebase";
//db ref mods and extract module name and summaries
export default {
  name: "careerSearch",
  data() {
    return {
      majors:[],

      major: "Bachelor of Arts (Architecture)"
    };
  },
  mounted(){
    db.ref("career").once("value")
      .then(snapshot => {
        return snapshot.val();
      }).then(result => {
        this.majors=Object.keys(result);
      });
  },
  firebase: {}
};
</script>
