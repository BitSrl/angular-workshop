import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchMovieResponse, SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit, OnDestroy {
  recommendedSubs: Subscription | undefined;
  recommendedMovies: Array<SearchMovieResult> | undefined;

  constructor(private router: Router, private tmdbService: TMDBService) {
  }
  
  ngOnInit(): void {
    const movie = this.tmdbService.getLastQueriedMovie();
    this.recommendedSubs = this.tmdbService.recommendedMovies(movie!.id).subscribe({
      next: (response: SearchMovieResponse) => this.recommendedMovies = response.results
    });
  }

  ngOnDestroy(): void {
    if (this.recommendedSubs) {
      this.recommendedSubs.unsubscribe();
    }
  }

  goToRelatedMovie = (movie_id: number): Promise<boolean> => this.router.navigateByUrl(`/movie/${movie_id}`);
}
