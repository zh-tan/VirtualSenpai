<template>
  <div id="app">
    <Navbar v-if="this.$route.path!=='/hometest'"></Navbar> 
    <main>
    <br>
    <router-view :key="$route.fullPath"/>
    </main>
    <b-modal v-if="true" ref="myModalRef" 
    hide-footer title="Welcome to VirtualSenpai!"
                 :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant">
      <div class="d-block text-center">

     <div classname="Logo">
  <img class="animated bounce infinite" src='https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/yq4o-newlogo.png'>
  </div>
        <p> Enough of searching for information online just to find that they are of little help? Tired of asking seniors for information regarding academic matters? Worrying that this information might also be unreliable? </p>
        <p><b><font size="5">Fret not! VirtualSenpai! is here to help!</font></b></p>
        VirtualSenpai! is a centralised, data driven platform that empowers you with visuals to make more informed decisions. You can now have a more objective view when selecting modules and easily explore your different career prospects in greater details!</p>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Let's begin!</b-btn>
    </b-modal>
  
  </div>
</template>



<script>
import Navbar from "./components/Navbar";
export default {
  mounted() {
    this.$refs.myModalRef.show();
  },
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {

      headerBgVariant: "secondary",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark"
    };
  },
  methods: {
    hideModal() {
      this.$refs.myModalRef.hide();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  display: grid;
  grid-auto-rows: minmax(40px, auto);
}
router-view {
}

main {
  background-color: #f0f0f1;
}
</style>
