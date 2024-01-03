import { Ref, ref } from "vue";
import { ApiTmdb } from "../config/axios/axios.config";
import apiKey from "../config/apiKey";
import imagePath from "../config/image.path";

type MovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type SearchResponse = {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieResult[];
};

type movie = {
  id: number;
  title: string;
  release_date: string;
  poster: string;
};

export function UseMovieSearch() {
  const loading = ref(false);
  const movies: Ref<movie[]> = ref([]);
  const movieSelected: Ref<movie | undefined> = ref(undefined);

  async function getMovies(query: string) {
    try {
      loading.value = true;
      const req = await ApiTmdb.get<SearchResponse>(
        `/search/movie?api_key=${apiKey.key}&query=${query}`
      );
      const { data } = req;

      const result = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster: `${imagePath.url}/${movie.poster_path}`,
      }));

      movies.value = result;
    } catch (_) {
      console.log("erro na search");
    } finally {
      loading.value = false;
    }
  }

  function clearSearch() {
    movies.value = [];
  }

  function selectMovie(movie: movie) {
    movieSelected.value = movie;
  }

  return {
    getMovies,
    clearSearch,
    movies,
    loading,
    movieSelected,
    selectMovie,
  };
}
