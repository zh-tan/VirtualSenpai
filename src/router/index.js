import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import Module from "@/components/Module";
import Career from "@/components/Career";
import BadGateway from "@/components/BadGateway";

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
      component: Homepage
    },
    {
      path: "/module",
      name: "Codule",
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
    }
  ]
});
