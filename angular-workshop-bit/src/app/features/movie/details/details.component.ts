import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Movie, MovieCredits, MovieCrew, MovieProvidersResponseResult } from 'src/app/models/interfaces/movie.interface';
import { SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnDestroy {
  movieSubs: Subscription | undefined;
  movieCreditsSubs: Subscription | undefined;
  similarMoviesSubs: Subscription | undefined;
  recommendedMoviesSubs: Subscription | undefined;
  watchProvidersSubs: Subscription | undefined;
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
    const lastQueriedMovie = this.tmdbService.getLastQueriedMovie();
    if (lastQueriedMovie) {
      this.movie = lastQueriedMovie;
      this.getMovieExtraInformation(this.movie);
    } else {
      this.movieSubs = this.tmdbService.movie(this.activatedRoute.snapshot.params['id'])
        .subscribe({
          next: movie => {
            this.movie = movie;

            this.getMovieExtraInformation(movie);
          }
      });
    }
  }

  private getMovieExtraInformation(movie: Movie) {
    this.movieCreditsSubs = this.tmdbService.movieCredits(movie.id)
      .subscribe({
        next: credits => {
          this.credits = credits;
          this.director = credits.crew.find(person => person.job === 'Director');
        }
      });

    this.similarMoviesSubs = this.tmdbService.similarMovies(movie.id)
      .pipe(map(response => response.results))
      .subscribe({
        next: movies => this.similarMovies = movies
      });

    this.recommendedMoviesSubs = this.tmdbService.recommendedMovies(movie.id)
      .pipe(map(response => response.results))
      .subscribe({
        next: movies => this.recommendedMovies = movies
      });

    this.watchProvidersSubs = this.tmdbService.watchProviders(movie.id)
      .subscribe({
        next: providers => this.watchProviders = providers
      });
  }

  ngOnDestroy(): void {
    if (this.movieSubs) {
      this.movieSubs.unsubscribe();
    }

    if (this.movieCreditsSubs) {
      this.movieCreditsSubs.unsubscribe();
    }

    if (this.similarMoviesSubs) {
      this.similarMoviesSubs.unsubscribe();
    }

    if (this.recommendedMoviesSubs) {
      this.recommendedMoviesSubs.unsubscribe();
    }

    if (this.watchProvidersSubs) {
      this.watchProvidersSubs.unsubscribe();
    }
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
