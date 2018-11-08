// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueFire from "vuefire";
import router from "./router";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "mdbvue/build/css/mdb.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/build/css/mdb.css";
import VueChartkick from "vue-chartkick";
import Highcharts from "highcharts";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
import "vue-search-bar/dist/vue-search-bar.min.css";
import "vuetify/dist/vuetify.min.css";
import { SearchBar } from "vue-search-bar";
import Vuetify from "vuetify";
Vue.use(Vuetify);
Vue.use(SearchBar);
Vue.use(BootstrapVue);

Vue.use(VueChartkick, { adapter: Highcharts });
Vue.config.productionTip = false;

//console.log(testref);
//let booksRef = db.ref('books')
Vue.use(VueFire);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
