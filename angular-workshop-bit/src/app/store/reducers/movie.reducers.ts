import { createReducer, on } from "@ngrx/store";
import { MovieActions } from "../action-types/movie.action-types";
import { MovieState } from "../states/movie.state";

const INIT_STATE: MovieState = {
  movies: undefined,
  selected_movie: undefined,
  extended_info: undefined
};

export const movieReducers = createReducer(
  INIT_STATE,
  on(MovieActions.GetMoviesSuccess, (state: MovieState, { movies }) => ({ ...state, movies })),
  on(MovieActions.GetSelectedMovieSuccess, (state: MovieState, { selected_movie }) => ({ ...state, selected_movie })),
  on(MovieActions.GetMovieExtendedInfoSuccess, (state: MovieState, { extended_info }) => ({ ...state, extended_info })),
);