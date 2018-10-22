import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import Module from "@/components/Module";
import Career from "@/components/Career";
import BadGateway from "@/components/BadGateway";
import NavPage from "@/components/NavPage";
import dashboard from "@/components/dashboardlayout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: dashboard
    },
    {
      path: "/module",
      name: "Module",
      component: Module
    },
    {
      path: "/career",
      name: "Career",
      component: Career
    },
    {
      path: "/404",
      name: "BadGateway",
      component: BadGateway
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: "/nav",
      name: "Home",
      component: NavPage
    }
  ]
});
