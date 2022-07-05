import Vue from "vue";
import VueRouter from "vue-router";

import DesktopView from "@/views/DesktopView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "desktop",
    component: DesktopView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
