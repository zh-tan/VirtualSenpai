<template>
<ul>
<li v-for="x in tests" > 
{{x[".key"]}} : {{x[".value"]}}  </li>
</ul>

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
      source: db.ref("test"),
      cancelCallback(err) {
        console.error(err);
      }
    }
  }
};
</script>
