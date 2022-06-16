import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, forkJoin, map, of, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { Movie, MovieCredits, MovieCrew, MovieProvidersResponseResult } from 'src/app/models/interfaces/movie.interface';
import { SearchMovieResponse, SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends UnsubscriptionHandler {
  movie: Movie | undefined;
  credits: MovieCredits | undefined;
  similarMovies: Array<SearchMovieResult> | undefined;
  recommendedMovies: Array<SearchMovieResult> | undefined;
  watchProviders: MovieProvidersResponseResult | undefined;
  director: MovieCrew | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private tmdbService: TMDBService
  ) {
    super();

    this.tmdbService.lastQueriedMovie.pipe(
      first(),
      switchMap((movie: Movie | undefined) => {     // higher order operator => higher order functions => funzioni che accettano come parametro un'altra funzione (callback), oppure funzioni che ritornano un'altra funzione (closures)
        const movieId = +this.activatedRoute.snapshot.params['id']; // +'1' => 1 | +'ciao' => NaN
        if (!!movie && movie.id === movieId) {      // !! bitwise operator => forza la conversione a bit => 0 false 1 true
          return of(movie);
        } else {
          return this.tmdbService.movie(movieId);
        }
      }),
      withLatestFrom(this.tmdbService.lastQueriedMovieExtended), // recupera l'ultimo valore conservato nello stato interno dell'Observable
      switchMap(([movie, extendedInfo]) => {      // destructuring degli array => [0 (movie), 1 (extendedInfo)] => [movie, extended] => var movie = array[0], var extended = array[1]
        if (extendedInfo) {
          const response = [movie, ...Object.values(extendedInfo).reduce((acc, value) => { acc.push(value); return acc; }, []), false];
          return of(response)
        } else {
          return forkJoin([
            of(movie),
            this.tmdbService.movieCredits(movie.id),
            this.tmdbService.recommendedMovies(movie.id).pipe(map((response: SearchMovieResponse) => response.results)),
            this.tmdbService.similarMovies(movie.id).pipe(map((response: SearchMovieResponse) => response.results)),
            this.tmdbService.watchProviders(movie.id),
            of(true)
          ]);
        }
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (([movie, credits, recommendedMovies, similarMovies, watchProviders, saveData]) => {
        this.movie = movie;
        this.credits = credits;
        this.director = (credits as MovieCredits).crew.find(person => person.job === 'Director');
        this.similarMovies = similarMovies;
        this.recommendedMovies = recommendedMovies;
        this.watchProviders = watchProviders;

        if (saveData) {
          this.tmdbService.setLastQueriedMovie(movie);
          this.tmdbService.setLastQueriedMovieExtendedInfo({ credits, similarMovies, recommendedMovies, watchProviders }); // assegnazione implicita => var name, { name } => { name: name } => { name }
        }
      })
    });

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

  viewAllCast = (): Promise<boolean> => this.router.navigateByUrl(`/movie/${this.movie!.id}/credits`);
  viewAllSimilarMovies = (): Promise<boolean> => this.router.navigateByUrl(`/movie/${this.movie!.id}/similar`);
  viewAllRecommendedMovies = (): Promise<boolean> => this.router.navigateByUrl(`/movie/${this.movie!.id}/recommended`);
  goToRelatedMovie = (movie_id: number): Promise<boolean> => this.router.navigateByUrl(`/movie/${movie_id}`);
}
