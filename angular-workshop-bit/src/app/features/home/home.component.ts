import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, map, Observable, Observer, takeUntil } from 'rxjs';
import { SearchMovieResponse } from 'src/app/models/interfaces/search-movie-response.interface';
import { MovieActions } from 'src/app/store/action-types/movie.action-types';
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
  searchCtrl: FormControl = new FormControl('');
  movies$: Observable<SearchMovieResponse | undefined> | undefined;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.movies$ = this.store.select(selectMovies);
    
    this.searchCtrl.valueChanges
    .pipe(
      filter((value: string): boolean => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    )
    .subscribe({
      next: (query: string) => this.store.dispatch(MovieActions.GetMovies({ query }))
    });

    // this.tmdbService.lastQueriedMovies
    // .pipe(takeUntil(this.destroy$))
    // .subscribe({
    //   next: ((response: SearchMovieResponse | undefined) => this.movies$ = of(response))
    // });

    // this.searchCtrl.valueChanges
    // .pipe(
    //   filter((value: string): boolean => value.length > 2),
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   takeUntil(this.destroy$),
    //   switchMap((value: string) => this.tmdbService.movies(value))
    // )
    // .subscribe();
  }

  movieDetails = (movie_id: number): void => {
    // this.tmdbService.setLastQueriedMovie(undefined);
    // this.tmdbService.setLastQueriedMovieExtendedInfo(undefined);
    this.store.dispatch(SystemActions.Redirect({ url: `/movie/${movie_id}` }));
    // this.router.navigateByUrl(`/movie/${movie_id}`);
  }

  observerFactory = <T, K>(next: (value: T) => void, error?: (error: K) => void, complete?: () => void): Observer<T> => {
    const observer: Partial<Observer<T>> = { next };
    if (!!error) {
      observer.error = error;
    }

    if (!!complete) {
      observer.complete = complete;
    }

    return observer as Observer<T>;

  };

  // FUNZIONE PURA
  // map = <T, K>(list: Array<T>, callbackFn: (el: T, i?: number, arr?: Array<T>) => K): Array<K> => {
  //   const newArray: Array<K> = new Array<K>();
  //   for (let index = 0; index < list.length; index++) {
  //     const mappedValue: K = callbackFn(list[index], index, list);
  //     newArray.push(mappedValue);
  //   }

  //   return newArray;
  // }
}
