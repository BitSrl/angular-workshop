import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Movie, MovieCredits, MovieCrew } from 'src/app/models/interfaces/movie.interface';
import { SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movieSubs: Subscription;
  movieCreditsSubs: Subscription | undefined;
  similarMoviesSubs: Subscription | undefined;
  recommendedMoviesSubs: Subscription | undefined;
  movie: Movie | undefined;
  credits: MovieCredits | undefined;
  similarMovies: Array<SearchMovieResult> | undefined;
  recommendedMovies: Array<SearchMovieResult> | undefined;
  director: MovieCrew | undefined;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TMDBService) {
    const lastQueriedMovie = this.tmdbService.getLastQueriedMovie();
    if (lastQueriedMovie) {
      this.movie = lastQueriedMovie;
    } else {
      this.movieSubs = this.tmdbService.movie(this.activatedRoute.snapshot.params['id'])
        .subscribe({
          next: movie => {
            this.movie = movie;

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
          }
      });
    }
  }

  ngOnInit(): void {
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
  }

  viewAllCast = () => {
    alert('tbd');
  }

}
