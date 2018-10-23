import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import Module from "@/components/Module";
import Career from "@/components/Career";
import BadGateway from "@/components/BadGateway";
import NavPage from "@/components/NavPage";
import dashboard from "@/components/dashboardlayout";
import testing from "@/components/test";

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
      component: testing
    },
    {
      path: "/module/:rendered",
      name: "Module",
      component: Module,
      props: true
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
    }
  ]
});
