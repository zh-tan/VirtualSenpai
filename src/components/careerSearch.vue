<template>
<div>
<h1>career search</h1>
<router-link :to="{ path : '/moduleview/'+'ACC1002'}">test</router-link>
</div>
</template>

<script>
import { db } from "../firebase";
//db ref mods and extract module name and summaries
export default {
  name: "careerSearch",
  data() {
    return {
    };
  },
  firebase: {
  }
};
</script>
