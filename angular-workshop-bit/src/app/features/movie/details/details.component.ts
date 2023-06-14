import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  first,
  forkJoin,
  map,
  of,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import {
  Movie,
  MovieCredits,
  MovieCrew,
  MovieProvidersResponseResult,
} from 'src/app/models/interfaces/movie.interface';
import {
  SearchMovieResponse,
  SearchMovieResult,
} from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
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

    /*
    ** 1. vado a prendere il valore che c'è dentro il Subject "lastQueriedMovie" => 
        - se ho fatto F5 sulla pagina di dettaglio, avrò l'ultimo film ricercato che poi ho salvato in memoria (local storage)
        - se ho effettuato una nuova ricerca, il valore dentro il Subject sarà undefined, come impostato al click su un film
    ** 2. siccome questo componente di dettaglio viene istanziato per ogni film ricercato (dal cambio di rotta) 
          ci basta prendere il primo valore emesso (first)
    ** 3. se abbiamo un film in memoria, e quel film ha lo stesso id che è presente nell'url della rotta, restituiamo il film salvato in memoria
          altrimenti, restituiamo il valore ritornato dalla chiamata al BE (/movie/{id})
    ** 4. vado a recuperare l'ultimo valore presente dentro il Subject "lastQueriedMovieExtended" utilizzando l'operatore withLatestFrom
    ** 5. il withLatestFrom trasforma il valore che sto emettendo nel flusso reattivo in un array contenente ad ogni indice i valori degli
          osservabili di cui ci interessa avere il loro valore 
          (è consigliato usare il destructuring degli array per assegnare al valore presente ad ogni indice, una variabile identificativa)
    ** 6. se ho fatto F5 gestisco tutto internamente, altrimenti utilizzo l'operatore forkJoin
    */

    this.tmdbService.lastQueriedMovie
      .pipe(
        first(),
        switchMap((movie: Movie | undefined) => {
          // higher order operator => higher order functions => funzioni che accettano come parametro un'altra funzione (callback), oppure funzioni che ritornano un'altra funzione (closures)
          const movieId = +this.activatedRoute.snapshot.params['id']; // +'1' => 1 | +'ciao' => NaN
          if (!!movie && movie.id === movieId) {
            // !! bitwise operator => forza la conversione a bit => 0 false 1 true
            return of(movie);
          } else {
            return this.tmdbService.movie(movieId);
          }
        }),
        withLatestFrom(this.tmdbService.lastQueriedMovieExtended), // recupera l'ultimo valore conservato nello stato interno dell'Observable
        switchMap(([movie, extendedInfo]) => {
          // destructuring degli array => [0 (movie), 1 (extendedInfo)] => [movie, extended] => var movie = array[0], var extended = array[1]
          if (extendedInfo) {
            const response = [
              movie,
              ...Object.values(extendedInfo), // [credits, recommended, similar, watch] => credits, recommended, similar, watch
              false,
            ];
            return of(response);
          } else {
            return forkJoin([
              of(movie),
              this.tmdbService.movieCredits(movie.id),
              this.tmdbService
                .recommendedMovies(movie.id)
                .pipe(map((response: SearchMovieResponse) => response.results)),
              this.tmdbService
                .similarMovies(movie.id)
                .pipe(map((response: SearchMovieResponse) => response.results)),
              this.tmdbService.watchProviders(movie.id),
              of(true),
            ]);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ([
          movie,
          credits,
          recommendedMovies,
          similarMovies,
          watchProviders,
          saveData,
        ]) => {
          this.movie = movie;
          this.credits = credits;
          this.director = (credits as MovieCredits).crew.find(
            (person) => person.job === 'Director'
          );
          this.similarMovies = similarMovies;
          this.recommendedMovies = recommendedMovies;
          this.watchProviders = watchProviders;

          if (saveData) {
            this.tmdbService.setLastQueriedMovie(movie);
            this.tmdbService.setLastQueriedMovieExtendedInfo({
              credits,
              similarMovies,
              recommendedMovies,
              watchProviders,
            }); // assegnazione implicita => var name, { name } => { name: name } => { name }
          }
        },
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
    this.tmdbService
      .movieCredits(movie.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (credits) => {
          this.credits = credits;
          this.director = credits.crew.find(
            (person) => person.job === 'Director'
          );
        },
      });

    this.tmdbService
      .similarMovies(movie.id)
      .pipe(
        map((response) => response.results),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (movies) => (this.similarMovies = movies),
      });

    this.tmdbService
      .recommendedMovies(movie.id)
      .pipe(
        map((response) => response.results),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (movies) => (this.recommendedMovies = movies),
      });

    this.tmdbService
      .watchProviders(movie.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (providers) => (this.watchProviders = providers),
      });
  }

  viewAllCast(): void {
    this.router.navigateByUrl(`/movie/${this.movie!.id}/credits`);
  }

  viewAllSimilarMovies(): void {
    this.router.navigateByUrl(`/movie/${this.movie!.id}/similar`);
  }

  viewAllRecommendedMovies(): void {
    this.router.navigateByUrl(`/movie/${this.movie!.id}/recommended`);
  }

  goToRelatedMovie(movie_id: number): void {
    this.router.navigateByUrl(`/movie/${movie_id}`);
  }
}
