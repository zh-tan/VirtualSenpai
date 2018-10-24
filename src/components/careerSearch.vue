<template>
<div>
<h1>career search</h1>
<router-link :to="{ path : '/careerview/' +'Bachelor of Arts (Architecture)'}">
  Bachelor of Arts (Architecture)
</router-link>
</div>
</template>

<script>
import { db } from "../firebase";
//db ref mods and extract module name and summaries
export default {
  name: "careerSearch",
  data() {
    return {
      major: "Bachelor of Arts (Architecture)"
    };
  },
  firebase: {}
};
</script>
