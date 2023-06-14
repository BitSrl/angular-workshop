import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchMovieResult, SearchMovieResponse } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent implements OnDestroy {
  similarSubs: Subscription | undefined;
  similarMovies: Array<SearchMovieResult> | undefined;

  constructor(private router: Router, private tmdbService: TMDBService) {
    const movie = this.tmdbService.getLastQueriedMovie();
    this.similarSubs = this.tmdbService.similarMovies(movie!.id).subscribe({
      next: (response: SearchMovieResponse) => this.similarMovies = response.results
    });
  }

  ngOnDestroy(): void {
    if (this.similarSubs) {
      this.similarSubs.unsubscribe();
    }
  }

  goToRelatedMovie(movie_id: number): void {
    this.router.navigateByUrl(`/movie/${movie_id}`);
  }
}
