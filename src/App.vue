<template>
  <div id="app">
  <div class="landing" v-if="this.$route.path=='/home'"> </div>
    <link rel="stylesheet"
        type="text/css"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
    <Navbar v-if="this.$route.path!=='/home'"></Navbar>

    <main>

      <div class="routerview">
    <router-view :key="$route.fullPath"/>
      </div>
    </main>
    <b-modal v-if="true" ref="myModalRef"
    hide-footer title="VirtualSenpai! README"
                 :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant">
      <div class="d-block text-center">

     <div classname="Logo">
  <img class="animated bounce infinite" src='./assets/newlogo.png'>
  </div>
        <b><font size="5">Hi Prof Chris or any other visitors</font></b><br>

          Welcome to virtual senpai! <br/>
          Since our team mainly used the provided data catalogue, what we have done is populate
          the original dataset with additional realistic data.
          However, it was not feasible for us to populate data for every module & every major program<br/>
        </p>
        <strong>The pages that we have additionally populated are</strong><br/>
        <strong>For Modules</strong>
        <ul>
          <li>ACC1002, Financial Accounting</li>
          <li>CS1020, Data Structures and Algorithms I</li>
          <li>IE2110, Operations Research I</li>
        </ul>

        <strong>For Career</strong>
        <ul>
          <li>Bachelor of Business Administration (Accountancy)</li>
          <li>Bachelor of Computing (Computer Science)</li>
          <li>Bachelor of Engineering(Industrial System Engineering)</li>
        </ul>

      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">To view this again, just refresh from any page</b-btn>
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
  background-image: url("./assets/students.jpg");
  background-size:100% 100%;
  background-repeat: no-repeat;
  //   filter: blur(1px);
  // -webkit-filter: blur(1px);
}
.routerview{
  margin-top:10px;
}
</style>
