import { createRouter, createWebHistory } from "vue-router";
import homePageVue from "../views/home-page.vue";
import loginPageVue from "../views/login-page.vue";
import { useAuth } from "../composables/auth";

const { checkAuthentication } = useAuth();

const routes = [
  {
    path: "/",
    name: "Home",
    component: homePageVue,
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !checkAuthentication()) {
    next("/login");
    return;
  }

  if (to.path === "/login" && checkAuthentication()) {
    next("/");
    return;
  }

  next();
});

export default router;
