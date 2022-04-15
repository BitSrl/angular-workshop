import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchMovieResponse } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchCtrl: FormControl = new FormControl('');
  moviesSubs: Subscription | undefined;
  movies: SearchMovieResponse | undefined;

  constructor(private router: Router, private tmdbService: TMDBService) { }

  ngOnInit(): void {
    const lastQueriedMovies = this.tmdbService.getLastQueriedMovies();
    if (lastQueriedMovies) {
      this.movies = lastQueriedMovies;
    }
  }

  ngOnDestroy(): void {
    if (this.moviesSubs) {
      this.moviesSubs.unsubscribe();
    }
  }

  search = (): void => {
    this.moviesSubs = this.tmdbService.movies(this.searchCtrl.value).subscribe({
      next: (movies: SearchMovieResponse) => this.movies = movies,
      error: (error: Error) => console.log(error)
    })
  };

  movieDetails = (movie_id: number): void => {
    this.tmdbService.resetLastQueriedMovie();
    this.router.navigateByUrl(`/movie/${movie_id}`);
  }
}
