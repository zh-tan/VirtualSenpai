<template>
<div>
<h1>mod search</h1>
<router-link :to="{ path : '/moduleview/'+'ACC1002'}">ACC1002</router-link>
<br>
<router-link :to="{ path : '/moduleview/'+'CS1010S'}">CS1010S</router-link>

</div>
</template>

<script>
import { db } from "../firebase";

//db ref mods and extract module name and summaries
export default {
  name: "modSearch",
  data() {
    return {};
  },
  firebase: {}
};
</script>
