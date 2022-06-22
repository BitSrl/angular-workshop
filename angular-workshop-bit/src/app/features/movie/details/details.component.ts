import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, forkJoin, map, Observable, of, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { Movie, MovieCredits, MovieCrew, MovieExtendedInfo, MovieProvidersResponseResult } from 'src/app/models/interfaces/movie.interface';
import { SearchMovieResponse, SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { MovieActions } from 'src/app/store/action-types/movie.action-types';
import { SystemActions } from 'src/app/store/action-types/system.action-types';
import { selectCurrentMovie, selectCurrentMovieExtendedInfo } from 'src/app/store/selectors/movie.selectors';
import { AppState } from 'src/app/store/states/app.state';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends UnsubscriptionHandler implements OnInit {
  movie$: Observable<Movie | undefined> | undefined;
  extendedInfo$: Observable<MovieExtendedInfo | undefined> | undefined;
  
  movie: Movie | undefined;
  credits: MovieCredits | undefined;
  similarMovies: Array<SearchMovieResult> | undefined;
  recommendedMovies: Array<SearchMovieResult> | undefined;
  watchProviders: MovieProvidersResponseResult | undefined;
  director: MovieCrew | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private tmdbService: TMDBService,
    private store: Store<AppState>
  ) {
    super();

    const id: number = +this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(MovieActions.GetSelectedMovie({ id }));
    this.store.dispatch(MovieActions.GetMovieExtendedInfo({ id }));
    // this.tmdbService.lastQueriedMovie.pipe(
    //   first(),
    //   switchMap((movie: Movie | undefined) => {     // higher order operator => higher order functions => funzioni che accettano come parametro un'altra funzione (callback), oppure funzioni che ritornano un'altra funzione (closures)
    //     const movieId = +this.activatedRoute.snapshot.params['id']; // +'1' => 1 | +'ciao' => NaN
    //     if (!!movie && movie.id === movieId) {      // !! bitwise operator => forza la conversione a bit => 0 false 1 true
    //       return of(movie);
    //     } else {
    //       return this.tmdbService.movie(movieId);
    //     }
    //   }),
    //   withLatestFrom(this.tmdbService.lastQueriedMovieExtended), // recupera l'ultimo valore conservato nello stato interno dell'Observable
    //   switchMap(([movie, extendedInfo]) => {      // destructuring degli array => [0 (movie), 1 (extendedInfo)] => [movie, extended] => var movie = array[0], var extended = array[1]
    //     if (extendedInfo) {
    //       const response = [movie, ...Object.values(extendedInfo).reduce((acc, value) => { acc.push(value); return acc; }, []), false];
    //       return of(response)
    //     } else {
    //       return forkJoin([
    //         of(movie),
    //         this.tmdbService.movieCredits(movie.id),
    //         this.tmdbService.recommendedMovies(movie.id).pipe(map((response: SearchMovieResponse) => response.results)),
    //         this.tmdbService.similarMovies(movie.id).pipe(map((response: SearchMovieResponse) => response.results)),
    //         this.tmdbService.watchProviders(movie.id),
    //         of(true)
    //       ]);
    //     }
    //   }),
    //   takeUntil(this.destroy$)
    // )
    // .subscribe({
    //   next: (([movie, credits, recommendedMovies, similarMovies, watchProviders, saveData]) => {
    //     this.movie = movie;
    //     this.credits = credits;
    //     this.director = (credits as MovieCredits).crew.find(person => person.job === 'Director');
    //     this.similarMovies = similarMovies;
    //     this.recommendedMovies = recommendedMovies;
    //     this.watchProviders = watchProviders;

    //     if (saveData) {
    //       this.tmdbService.setLastQueriedMovie(movie);
    //       this.tmdbService.setLastQueriedMovieExtendedInfo({ credits, similarMovies, recommendedMovies, watchProviders }); // assegnazione implicita => var name, { name } => { name: name } => { name }
    //     }
    //   })
    // });

    // if (lastQueriedMovie) {
    //   this.movie = lastQueriedMovie;
    //   this.getMovieExtraInformation(this.movie);
    // } else {
    //    this.tmdbService.movie(paramId)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //       next: movie => {
    //         this.movie = movie;

    //         this.getMovieExtraInformation(movie);
    //       }
    //     });
    // }
  }
  ngOnInit(): void {
    this.movie$ = this.store.select(selectCurrentMovie);
    this.extendedInfo$ = this.store.select(selectCurrentMovieExtendedInfo)
      .pipe(
        filter((extendedInfo: MovieExtendedInfo | undefined): extendedInfo is MovieExtendedInfo => !!extendedInfo),
        tap((extendedInfo: MovieExtendedInfo) => this.director = (extendedInfo.credits as MovieCredits).crew.find(person => person.job === 'Director'))
      );
  }

  private getMovieExtraInformation(movie: Movie) {
    this.tmdbService.movieCredits(movie.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: credits => {
          this.credits = credits;
          this.director = credits.crew.find(person => person.job === 'Director');
        }
      });

    this.tmdbService.similarMovies(movie.id)
      .pipe(
        map(response => response.results),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: movies => this.similarMovies = movies
      });

    this.tmdbService.recommendedMovies(movie.id)
      .pipe(
        map(response => response.results),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: movies => this.recommendedMovies = movies
      });

    this.tmdbService.watchProviders(movie.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: providers => this.watchProviders = providers
      });
  }

  viewAllCast = (movie_id: number): void => this.store.dispatch(SystemActions.Redirect({ url: `/movie/${movie_id}/credits` }));
  viewAllSimilarMovies = (movie_id: number): void => this.store.dispatch(SystemActions.Redirect({ url: `/movie/${movie_id}/similar` }));
  viewAllRecommendedMovies = (movie_id: number): void => this.store.dispatch(SystemActions.Redirect({ url: `/movie/${movie_id}/recommended` }));
  goToRelatedMovie = (movie_id: number): void => this.store.dispatch(SystemActions.Redirect({ url: `/movie/${movie_id}` }));
}
