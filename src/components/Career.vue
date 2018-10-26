<template>
<p> career tab for router testing </p>
</template>

<script>
import { db } from "../firebase";
//impt
export default {
  data() {
    return {
      // i think this is needed to make it reactive
      // got to do with Vue Lifecycle
      tests: {}
    };
  },
  firebase: {
    tests: {
      // change the "test" to desired path
      source: db.ref("test"),
      // to throw back error
      cancelCallback(err) {
        console.error(err);
      }
    }
  }
};
</script>
