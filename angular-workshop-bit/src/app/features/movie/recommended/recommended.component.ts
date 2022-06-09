import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { SearchMovieResponse, SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent extends UnsubscriptionHandler implements OnInit {
  recommendedMovies: Array<SearchMovieResult> | undefined;

  constructor(
    private router: Router, 
    private tmdbService: TMDBService
  ) {
    super();
  }
  
  ngOnInit(): void {
    const movie = this.tmdbService.getLastQueriedMovie();
    this.tmdbService.recommendedMovies(movie!.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: SearchMovieResponse) => this.recommendedMovies = response.results
    });
  }


  goToRelatedMovie = (movie_id: number): Promise<boolean> => this.router.navigateByUrl(`/movie/${movie_id}`);
}
