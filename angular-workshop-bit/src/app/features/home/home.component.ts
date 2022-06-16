import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, Observable, Observer, of, switchMap, takeUntil } from 'rxjs';
import { SearchMovieResponse } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscriptionHandler implements OnInit {
  searchCtrl: FormControl = new FormControl('');
  movies$: Observable<SearchMovieResponse | undefined> | undefined;

  constructor(private router: Router, private tmdbService: TMDBService) {
    super();
  }

  ngOnInit(): void {
    this.tmdbService.lastQueriedMovies
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ((response: SearchMovieResponse | undefined) => this.movies$ = of(response))
    });

    this.searchCtrl.valueChanges
    .pipe(
      filter((value: string): boolean => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap((value: string) => this.tmdbService.movies(value))
    )
    .subscribe();

    // let lastValue = '';
    // this.searchCtrl.valueChanges.subscribe({
    //   next: (value: string) => {
    //     setTimeout(() => {
    //       if (value.length > 2) {
    //         if (lastValue !== value) {
    //           lastValue = value;

    //           this.movies$ = this.tmdbService.movies(value);
    //         }
    //       }
    //     }, 500);
    //   }
    // });
  }

  pipeFn = () => {
    filter((value: string): boolean => value.length > 2),
    debounceTime(500),
    distinctUntilChanged(),
    takeUntil(this.destroy$),
    switchMap((value: string) => this.tmdbService.movies(value))
  }

  movieDetails = (movie_id: number): void => {
    this.tmdbService.setLastQueriedMovie(undefined);
    this.tmdbService.setLastQueriedMovieExtendedInfo(undefined);
    this.router.navigateByUrl(`/movie/${movie_id}`);
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
