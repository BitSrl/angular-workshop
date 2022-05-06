import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, Subscription } from 'rxjs';
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

    // const observer: Partial<Observer<any>> = this.observerFactory<any>();
    // this.searchCtrl.valueChanges.subscribe(observer);
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
    });
  };

  movieDetails = (movie_id: number): void => {
    this.tmdbService.resetLastQueriedMovie();
    this.router.navigateByUrl(`/movie/${movie_id}`);
  }

  // observerFactory = <T, K>(next: (value: T) => void, error?: (error: K) => void, complete?: () => void): Observer<T> => {
  //   const observer: Partial<Observer<T>> = { next };
  //   if (!!error) {
  //     observer.error = error;
  //   }

  //   if (!!complete) {
  //     observer.complete = complete;
  //   }

  //   return observer as Observer<T>;

  // };

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
