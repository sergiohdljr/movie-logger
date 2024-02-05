import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { api } from "../../config/axios/axios.config";
import { useAuthStore } from "./auth";
import { toast } from "@/components/ui/toast";
import { AxiosError } from "axios";
import { TLogBody, TLogMovie, TPaginationLogs } from "./types";

export const useMovies = defineStore("movies", () => {
  const { token } = useAuthStore();
  const moviesLogged: Ref<TLogMovie[] | []> = ref([]);
  const totalMovies = ref(0);

  async function getLoggedMovies() {
    try {
      const { data } = await api.get<TPaginationLogs>("/log", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data: logs, total: totalLogs } = data;

      moviesLogged.value = logs;
      totalMovies.value = totalLogs;
    } catch (error) {
      console.error(error);
    }
  }

  async function logMovie(logMovie: TLogBody) {
    try {
      const { status, data } = await api.post("/log", logMovie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        moviesLogged.value = [
          ...moviesLogged.value,
          { ...data, movie: logMovie.movie },
        ];

        toast({
          title: `:)`,
          description: "Movie was logged with sucess!",
          variant: "default",
          class: "bg-green text-white",
          duration: 2000,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Log Error",
          description: error.response?.data.message,
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  }

  return { moviesLogged, getLoggedMovies, logMovie, totalMovies };
});
