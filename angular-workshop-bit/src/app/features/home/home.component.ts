import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap, takeUntil } from 'rxjs';

import { SearchMovieResponse } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { SystemActions } from 'src/app/store/action-types/system.action-types';
import { selectMovies } from 'src/app/store/selectors/movie.selectors';
import { AppState } from 'src/app/store/states/app.state';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscriptionHandler implements OnInit {
  searchCtrl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  movies$: Observable<SearchMovieResponse | undefined> | undefined;

  constructor(private store: Store<AppState>, private readonly tmdbService: TMDBService) {
    super();
  }

  ngOnInit(): void {
    this.movies$ = this.store.select(selectMovies);
    
    this.searchCtrl.valueChanges
    .pipe(
      filter((value: string): boolean => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value: string) => this.tmdbService.movies(value)),
      takeUntil(this.destroy$),
    )
    .subscribe();
  }

  movieDetails(movie_id: number): void {
    // this.tmdbService.setLastQueriedMovie(undefined);
    // this.tmdbService.setLastQueriedMovieExtendedInfo(undefined);
    this.store.dispatch(SystemActions.Redirect({ url: `/movie/${movie_id}` }));
    // this.router.navigateByUrl(`/movie/${movie_id}`);
  }
}
