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

  export type TLogMovie = {
    contain_spoilers: boolean;
    created_at: string;
    had_watched_before: boolean;
    id: string;
    like: boolean;
    movie: movie;
    movieId: number;
    movie_watched_date: string;
    rating: number;
    review: string;
    updated_at: string;
    userId: string;
  };
  
  export type TPaginationLogs = {
    pages: number;
    count: number;
    actualPage: number;
    total: number;
    data: TLogMovie[];
  };
  