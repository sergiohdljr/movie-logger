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
  const paginationInfo = ref({
    totalMovies: 0,
    pages: 0,
    actualPage: 1,
  });

  async function getLoggedMovies(skip?: number, filter?: string) {
    try {
      const { data } = await api.get<TPaginationLogs>(
        `/log?skip=${skip}&filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data: logs, total: totalLogs, actualPage, pages } = data;

      moviesLogged.value = logs;
      paginationInfo.value.totalMovies = totalLogs;
      paginationInfo.value.actualPage = actualPage;
      paginationInfo.value.pages = pages;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error Load",
          description: error.response?.data.message,
          variant: "destructive",
          duration: 2000,
        });
      }
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
          { ...data, movie: logMovie.movie },
          ...moviesLogged.value,
        ];
        moviesLogged.value.pop();

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

  return { moviesLogged, getLoggedMovies, logMovie, paginationInfo };
});
