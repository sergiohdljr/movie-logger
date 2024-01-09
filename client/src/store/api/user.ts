import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { useAuthStore } from "./auth";
import { api } from "../../config/axios/axios.config";

type userProfile = {
  name: string;
  username: string;
  avatar: string;
};

export const useUserProfile = defineStore("profile", () => {
  const profile: Ref<userProfile> = ref({
    username: "",
    avatar: "",
    name: "",
  });
  const { token } = useAuthStore();

  async function getProfile() {
    const { data } = await api.get<userProfile>("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    profile.value = data;
  }

  return { profile, getProfile };
});
