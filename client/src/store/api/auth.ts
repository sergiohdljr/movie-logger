import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../../config/axios/axios.config";
import { useToast } from "@/components/ui/toast";
import { AxiosError } from "axios";

type LoginPayload = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref();
  const isAuthenticated = ref(false);
  const token = ref(localStorage.getItem("token"));
  const { toast } = useToast();

  async function signIn(payload: LoginPayload) {
    try {
      const { data } = await api.post("/session", payload);
      user.value = data.data.user;
      isAuthenticated.value = true;
      localStorage.setItem("token", data.token);
      token.value = localStorage.getItem("token");
      toast({
        title: `bem vindo ${data.data.user.name}`,
        description: "login realizado com sucesso!",
        variant: "default",
        class: "bg-green text-white",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Login Error",
          description: error.response?.data.message,
          variant: "destructive",
          duration: 2000,
        });
      }
    }
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

  return {
    signIn,
    logout,
    user,
    isAuthenticated,
    token,
    checkAuthentication,
  };
});
