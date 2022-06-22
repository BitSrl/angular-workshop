import { createAction, props } from "@ngrx/store";
import { Movie, MovieExtendedInfo } from "src/app/models/interfaces/movie.interface";
import { SearchMovieResponse } from "src/app/models/interfaces/search-movie-response.interface";

export const GetMovies = createAction('[Movie] Get Movies', props<{ query: string }>());
export const GetMoviesSuccess = createAction('[Movie] Get Movies succeeded', props<{ movies: SearchMovieResponse }>());
export const GetMoviesFailure = createAction('[Movie] Get Movies failed', props<{ error: Error }>());

export const GetSelectedMovie = createAction('[Movie] Get selected movie', props<{ id: number }>());
export const GetSelectedMovieSuccess = createAction('[Movie] Get selected movie succeeded', props<{ selected_movie: Movie }>());
export const GetSelectedMovieFailure = createAction('[Movie] Get selected movie failed', props<{ error: Error }>());

export const GetMovieExtendedInfo = createAction('[Movie] Get movie extended info', props<{ id: number }>());
export const GetMovieExtendedInfoSuccess = createAction('[Movie] Get movie extended info succeeded', props<{ extended_info: MovieExtendedInfo }>());
export const GetMovieExtendedInfoFailure = createAction('[Movie] Get movie extended info failed', props<{ error: Error }>());