<template>
<div>
<h1>mod search</h1>
<router-link v-for="code in mod_names" :to="{ path : '/moduleview/'+code}">{{code}}<br></router-link>

</div>
</template>

<script>
import { db } from "../firebase";

//db ref mods and extract module name and summaries
export default {
  name: "modSearch",
  data() {
    return {
      mod_data:{},
      mod_names:[]
    };
  },
  mounted(){
    db.ref("/mods").once("value")
      .then(snapshot => {
        this.mod_data = snapshot.val();
      }).then(()=>{
        this.mod_names=Object.keys(this.mod_data);
      })
  },
  firebase: {}
};
</script>
