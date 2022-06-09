import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent extends UnsubscriptionHandler {
  similarMovies: Array<SearchMovieResult> | undefined;

  constructor(private router: Router, private tmdbService: TMDBService) {
    super();

    const movie = this.tmdbService.getLastQueriedMovie();
    this.tmdbService.similarMovies(movie!.id)
    .pipe(
      map(response => response.results),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: movies => this.similarMovies = movies
    });
  }

  goToRelatedMovie = (movie_id: number): Promise<boolean> => this.router.navigateByUrl(`/movie/${movie_id}`);
}
