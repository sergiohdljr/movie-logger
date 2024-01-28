import { createRouter, createWebHistory } from "vue-router";
import homePageVue from "../views/home-page.vue";
import loginPageVue from "../views/login-page.vue";
import { useAuthStore } from "../store/api/auth";
import registerPageVue from "@/views/register-page.vue";

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
  {
    path: "/register",
    name: "register",
    component: registerPageVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.checkAuthentication()) {
    next("/login");
    return;
  }

  if (to.path === "/login" && authStore.checkAuthentication()) {
    next("/");
    return;
  }

  next();
});

export default router;
