import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/interfaces/movie.interface';
import { SearchMovieResponse, SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { SystemActions } from 'src/app/store/action-types/system.action-types';
import { selectCurrentMovieSimilarMovies } from 'src/app/store/selectors/movie.selectors';
import { AppState } from 'src/app/store/states/app.state';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent extends UnsubscriptionHandler {
  similarMovies$: Observable<Array<SearchMovieResult> | undefined>;

  constructor(private store: Store<AppState>) {
    super();

    // this.similarMovies$ = this.tmdbService.lastQueriedMovie.pipe(
    //   filter((movie: Movie | undefined): movie is Movie => !!movie),
    //   switchMap((movie: Movie) => this.tmdbService.similarMovies(movie.id)),
    //   map((response: SearchMovieResponse): Array<SearchMovieResult> => response.results),
    //   takeUntil(this.destroy$)
    // )
    this.similarMovies$ = this.store.select(selectCurrentMovieSimilarMovies);
  }

  goToRelatedMovie = (movie_id: number): void => this.store.dispatch(SystemActions.Redirect({ url: `/movie/${movie_id}` }));
}
