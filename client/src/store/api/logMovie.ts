import { api } from "@/config/axios/axios.config";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { toast } from "@/components/ui/toast";
import { AxiosError } from "axios";

type TLogBody = {
  rating: number;
  review: string;
  had_watched_before: boolean;
  movie_watched_date: Date;
  like: boolean;
  contain_spoilers: boolean;
  movieId: number;
  movie: movie;
};

type movie = {
  id: number;
  name: string;
  year: string;
  poster: string;
};

export const useLogMovie = defineStore("logMovie", () => {
  const { token } = useAuthStore();

  async function logMovie(logMovie: TLogBody) {
    try {
      const { status } = await api.post("/log", logMovie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
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

  return { logMovie };
});
