export type TLogBody = {
    rating: number;
    review: string;
    had_watched_before: boolean;
    movie_watched_date: Date;
    like: boolean;
    contain_spoilers: boolean;
    movieId?: number;
    movie?: movie;
  };
  
  export type movie = {
    id: number;
    name: string;
    poster: string;
    year: string;
  };