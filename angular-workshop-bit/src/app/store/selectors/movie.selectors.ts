import { createSelector } from "@ngrx/store";
import { Movie, MovieCredits, MovieExtendedInfo } from "src/app/models/interfaces/movie.interface";
import { SearchMovieResponse, SearchMovieResult } from "src/app/models/interfaces/search-movie-response.interface";
import { AppState } from "../states/app.state";
import { MovieState } from "../states/movie.state";

const movieState = (state: AppState): MovieState => state.movie;
export const selectMovies = createSelector(movieState, (state: MovieState): SearchMovieResponse | undefined => state.movies);
export const selectCurrentMovie = createSelector(movieState, (state: MovieState): Movie | undefined => state.selected_movie);
export const selectCurrentMovieExtendedInfo = createSelector(movieState, (state: MovieState): MovieExtendedInfo | undefined => state.extended_info);
export const selectCurrentMovieCredits = createSelector(selectCurrentMovieExtendedInfo, (state: MovieExtendedInfo | undefined): MovieCredits | undefined => state?.credits);
export const selectCurrentMovieSimilarMovies = createSelector(selectCurrentMovieExtendedInfo, (state: MovieExtendedInfo | undefined): Array<SearchMovieResult> | undefined => state?.recommendedMovies);
export const selectCurrentMovieRecommendedMovies = createSelector(selectCurrentMovieExtendedInfo, (state: MovieExtendedInfo | undefined): Array<SearchMovieResult> | undefined => state?.similarMovies);
