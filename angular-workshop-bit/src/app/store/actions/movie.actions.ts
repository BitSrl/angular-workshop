import { createActionGroup, props } from "@ngrx/store";
import { Movie, MovieExtendedInfo } from "src/app/models/interfaces/movie.interface";
import { SearchMovieResponse } from "src/app/models/interfaces/search-movie-response.interface";

export const MovieActions = createActionGroup({
  source: 'Movie',
  events: {
    GetMovies: props<{ query: string }>(),
    GetMoviesSuccess: props<{ movies: SearchMovieResponse }>(),
    GetMoviesFailure: props<{ error: Error }>(),
    GetSelectedMovie: props<{ id: number }>(),
    GetSelectedMovieSuccess: props<{ selected_movie: Movie }>(),
    GetSelectedMovieFailure: props<{ error: Error }>(),
    GetMovieExtendedInfo: props<{ id: number }>(),
    GetMovieExtendedInfoSuccess: props<{ extended_info: MovieExtendedInfo }>(),
    GetMovieExtendedInfoFailure: props<{ error: Error }>(),
  }
});
