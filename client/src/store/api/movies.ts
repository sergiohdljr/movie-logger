import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { TAxiosTypedReturn, api } from "../../config/axios/axios.config";
import { useAuthStore } from "./auth";
import { toast } from "@/components/ui/toast";
import { AxiosError } from "axios";
import { TLogBody } from "./types";

export const useMovies = defineStore("movies", () => {
  const { token } = useAuthStore();
  const moviesLogged: Ref<TLogMovie[] | []> = ref([]);

  async function getLoggedMovies() {
    try {
      const { data } = await api.get<TAxiosTypedReturn<TLogMovie[]>>("/log", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      moviesLogged.value = data.data;
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

  return { moviesLogged, getLoggedMovies, logMovie };
});

type Movie = {
  id: number;
  name: string;
  poster: string;
  year: string;
};

type TLogMovie = {
  contain_spoilers: boolean;
  created_at: string;
  had_watched_before: boolean;
  id: string;
  like: boolean;
  movie: Movie;
  movieId: number;
  movie_watched_date: string;
  rating: number;
  review: string;
  updated_at: string;
  userId: string;
};
