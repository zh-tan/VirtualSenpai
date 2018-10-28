<template>
  <div id="app">
    <Navbar></Navbar> <br>
    <router-view/>

    <b-modal ref="myModalRef" 
    hide-footer title="Welcome to Virtual Senpai!"
                 :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant">
      <div class="d-block text-center">

     <div classname="Logo">
  <img class="animated bounce infinite" src="https://mdbootstrap.com/img/logo/mdb-transparent.png">
  </div>
        <h3>Hello From My Modal!</h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
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
      headerBgVariant: "info",
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
</style>
