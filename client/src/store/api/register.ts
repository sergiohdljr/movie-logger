import { defineStore } from "pinia";
import { api } from "@/config/axios/axios.config";
import { toast } from "@/components/ui/toast";
import { AxiosError } from "axios";

type TUserRegister = {
  name: string;
  username: string;
  email: string;
  avatar?: string | null;
  password: string;
};

export const useRegister = defineStore("register", () => {
  async function signUp({ email, name, password, username }: TUserRegister) {
    try {
      await api.post("/users", { email, name, username, password });
      toast({
        title: "account created with sucess!",
        description: "Welcome to movie logger.",
        class: "bg-green text-white",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Register Error",
          description: error.response?.data.message,
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  }

  return {
    signUp,
  };
});
