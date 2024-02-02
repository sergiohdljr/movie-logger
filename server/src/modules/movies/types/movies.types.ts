import { Movie } from "@prisma/client";

export type TMovieRepository = {
  findMoviesWatchedByUser: (id: string) => Promise<Array<Movie>>;
};
