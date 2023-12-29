Base URL: For the primary API:


https://api.themoviedb.org/3/
Endpoints:
Movies:

Details: /movie/{movie_id}
Popular Movies: /movie/popular
Top Rated Movies: /movie/top_rated
Now Playing: /movie/now_playing
Upcoming: /movie/upcoming
Recommendations for a movie: /movie/{movie_id}/recommendations
TV Shows:

Details: /tv/{tv_id}
Popular TV Shows: /tv/popular
Top Rated TV Shows: /tv/top_rated
Recommendations for a TV show: /tv/{tv_id}/recommendations
Search:

Multi-search: /search/multi
Search Movies: /search/movie
Search TV Shows: /search/tv
Search People: /search/person
People:

Details: /person/{person_id}
Popular People: /person/popular
Images:

Poster: /t/p/w300/{poster_path}
Backdrop: /t/p/w1280/{backdrop_path}
Configuration:

Base Image URL: /configuration
Genres:

List of Movie Genres: /genre/movie/list
List of TV Genres: /genre/tv/list
Authentication:
To make authorized requests, you'll need an API key. You can obtain this key by registering on the TMDb website. Once you have the API key, you'll typically include it in your requests like so:

bash
Copy code
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY