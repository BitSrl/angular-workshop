import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { Movie, MovieCredits, MovieCrew, MovieProvidersResponseResult } from 'src/app/models/interfaces/movie.interface';
import { SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
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

    const lastQueriedMovie = this.tmdbService.getLastQueriedMovie();
    if (lastQueriedMovie) {
      this.movie = lastQueriedMovie;
      this.getMovieExtraInformation(this.movie);
    } else {
      this.tmdbService.movie(this.activatedRoute.snapshot.params['id'])
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: movie => {
            this.movie = movie;

            this.getMovieExtraInformation(movie);
          }
        });
    }
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
