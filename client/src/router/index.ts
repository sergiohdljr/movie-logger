import { createRouter, createWebHistory } from "vue-router";
import homePageVue from "../views/home-page.vue";
import loginPageVue from "../views/login-page.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: homePageVue,
  },
  {
    path: "/login",
    name: "Login",
    component: loginPageVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
