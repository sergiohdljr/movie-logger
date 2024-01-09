import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../../config/axios/axios.config";
import { fa } from "vuetify/locale";

type LoginPayload = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref();
  const isAuthenticated = ref(false);
  const token = ref(localStorage.getItem("token"));

  async function signIn(payload: LoginPayload) {
    try {
      const { data } = await api.post("/session", payload);
      user.value = data.data.user;
      isAuthenticated.value = true;
      localStorage.setItem("token", data.token);
      token.value = localStorage.getItem("token");
    } catch (error) {}
  }

  function checkAuthentication() {
    if (token.value) {
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("token");
    isAuthenticated.value = false;
    token.value = localStorage.getItem("token");
  }

  return { signIn, logout, user, isAuthenticated, token, checkAuthentication };
});
