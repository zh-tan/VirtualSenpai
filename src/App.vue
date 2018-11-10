<template>
  <div id="app">
  <div class="landing" v-if="this.$route.path='/hometest'"> </div>
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <Navbar v-if="this.$route.path!=='/hometest'"></Navbar> 
    
    <main>
      
      <div class="routerview">
    <router-view :key="$route.fullPath"/>
      </div>
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
.landing{
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("https://uploads.codesandbox.io/uploads/user/dd765973-f46f-483a-b5f6-a5c9e6d70786/vfv2-resize.jpg");
  background-size:100% 100%;
  background-repeat: no-repeat;
    filter: blur(1px);
  -webkit-filter: blur(1px);
}
.routerview{
  margin-top:10px;
}
</style>
