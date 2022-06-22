import { Movie, MovieExtendedInfo } from "src/app/models/interfaces/movie.interface";
import { SearchMovieResponse } from "src/app/models/interfaces/search-movie-response.interface";

export interface MovieState {
  movies: SearchMovieResponse | undefined;
  selected_movie: Movie | undefined;
  extended_info: MovieExtendedInfo | undefined;
};