import Vue from "vue";
import VueRouter from "vue-router";

import DesktopView from "@/views/DesktopView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "desktop",
    component: DesktopView,
    meta: {
      title: "Chuong Kieu Van",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
