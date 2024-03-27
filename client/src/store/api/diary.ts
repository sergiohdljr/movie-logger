import { api } from "@/config/axios/axios.config";
import { defineStore } from "pinia";
import { TDiary } from "./types";
import { useAuthStore } from "./auth";
import { ref } from "vue";

export const useDiary = defineStore("diary", () => {
  const { token } = useAuthStore();
  const diaryMovies = ref<TDiary>();

  async function getDiary(): Promise<void> {
    const { data: diary } = await api.get<TDiary>("/diary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    diaryMovies.value = diary;
    return;
  }

  return { diaryMovies, getDiary };
});
