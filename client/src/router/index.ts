import { createRouter, createWebHistory } from "vue-router";
import homePageVue from "../views/home-page.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: homePageVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
