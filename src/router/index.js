import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import Module from "@/components/Module";
import Career from "@/components/Career";
import CareerDefault from "@/components/CareerDefault";
import BadGateway from "@/components/BadGateway";
import Navbar from "@/components/Navbar";
import dashboard from "@/components/dashboardlayout";
import modSearch from "@/components/ModSearch";
import careerSearch from "@/components/careerSearch";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/hometest"
    },
    {
      path: "/home",
      name: "Home",
      component: modSearch
    },
    {
      path: "/hometest",
      name: "Hometest",
      component: Homepage
    },
    {
      path: "/module",
      name: "Module",
      component: modSearch
    },
    {
      path: "/moduleview/:modCode",
      name: "ModuleView",
      component: Module
    },
    {
      path: "/career",
      name: "Career",
      component: careerSearch
    },
    {
      path: "/careerview/:careerTitle",
      name: "CareerView",
      component: Career
    },
    {
      path: "/careerview",
      name: "CareerViewDefault",
      component: CareerDefault
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
      name: "bar",
      component: dashboard
    }
  ]
});
