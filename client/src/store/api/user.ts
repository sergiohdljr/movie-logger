import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { useAuthStore } from "./auth";
import { api } from "../../config/axios/axios.config";
import { toast } from "@/components/ui/toast";
import { AxiosError } from "axios";

type userProfile = {
  name: string;
  username: string;
  avatar: string;
};

type updateUserProfile = {
  name: string;
  username: string;
  avatar: File;
};

export const useUserProfile = defineStore("profile", () => {
  const profile: Ref<userProfile> = ref({
    username: "",
    avatar: "",
    name: "",
  });

  const { token } = useAuthStore();

  async function getProfile(userToken: string) {
    try {
      const { data } = await api.get<userProfile>("/profile", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      profile.value = data;
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
  async function updateAvatar(file: File) {
    const data = new FormData();
    data.append("avatar", file);

    try {
      await api.patch("/users/avatar", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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

  async function updateProfile(userPayload: updateUserProfile) {
    const { name, username, avatar } = userPayload;

    try {
      await api.put(
        "/users",
        { name, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await updateAvatar(avatar);
      toast({
        title: "sucess!!!",
        description: "profile updated",
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

  return { profile, getProfile, updateProfile };
});
