import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Observable, of, switchMap, takeUntil } from 'rxjs';

import { SearchMovieResponse } from 'src/app/models/interfaces/search-movie-response.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscriptionHandler implements OnInit {
  searchCtrl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
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
      switchMap((value: string) => this.tmdbService.movies(value)),
      takeUntil(this.destroy$),
    )
    .subscribe();
  }

  movieDetails = (movie_id: number): void => {
    this.tmdbService.setLastQueriedMovie(undefined);
    this.tmdbService.setLastQueriedMovieExtendedInfo(undefined);
    this.router.navigateByUrl(`/movie/${movie_id}`);
  }
}
