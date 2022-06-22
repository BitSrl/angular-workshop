import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, forkJoin, map, of, switchMap } from "rxjs";
import { Movie } from "src/app/models/interfaces/movie.interface";
import { SearchMovieResponse } from "src/app/models/interfaces/search-movie-response.interface";
import { TMDBService } from "src/app/providers/services/tmdb.service";
import { MovieActions } from "../action-types/movie.action-types";

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions, private tmdbService: TMDBService) { }

  getMovies$ = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.GetMovies),
    switchMap(({ query }) => this.tmdbService.movies(query).pipe(
      map((movies: SearchMovieResponse) => MovieActions.GetMoviesSuccess({ movies })),
      catchError((error: Error) => of(MovieActions.GetMoviesFailure({ error })))
    ))
  ));

  getSelectedMovie$ = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.GetSelectedMovie),
    switchMap(({ id }) => this.tmdbService.movie(id).pipe(
      map((selected_movie: Movie) => MovieActions.GetSelectedMovieSuccess({ selected_movie })),
      catchError((error: Error) => of(MovieActions.GetSelectedMovieFailure({ error })))
    ))
  ));

  getMovieExtendedInfo$ = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.GetMovieExtendedInfo),
    switchMap(({ id }) => forkJoin([
      this.tmdbService.movieCredits(id),
      this.tmdbService.similarMovies(id).pipe(map((response: SearchMovieResponse) => response.results)),
      this.tmdbService.recommendedMovies(id).pipe(map((response: SearchMovieResponse) => response.results)),
      this.tmdbService.watchProviders(id),
    ]).pipe(
      map(([credits, similarMovies, recommendedMovies, watchProviders]) => MovieActions.GetMovieExtendedInfoSuccess({ extended_info: { credits, recommendedMovies, similarMovies, watchProviders } })),
      catchError((error: Error) => of(MovieActions.GetMovieExtendedInfoFailure({ error })))
    ))
  ));
}