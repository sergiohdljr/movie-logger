import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { TAxiosTypedReturn, api } from "../../config/axios/axios.config";
import { useAuthStore } from "./auth";

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

  return { moviesLogged, getLoggedMovies };
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
