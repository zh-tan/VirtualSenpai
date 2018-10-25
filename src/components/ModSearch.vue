<template>
<div>
note: load time too slow.
<div v-html="legacySystemHTML"></div>
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
      mod_names:[],
      legacySystemHTML: `
        <FONT color="#faddad" size="-2">
          <MARQUEE>If you are looking at this, Good job. Fuck you understand? :)).</MARQUEE>
          ...
        </FONT>
      `
    };
  },
  mounted(){
    db.ref("/mods").once("value")//need smaller dataset to quicken loading

      .then(snapshot => {
        this.mod_data = snapshot.val();
      }).then(()=>{
        this.mod_names=Object.keys(this.mod_data);
      })
  },
  firebase: {}
};
</script>