import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { SearchMovieResponse } from 'src/app/models/interfaces/search-movie-response.interface';
import {
  Movie,
  MovieCredits,
  MovieExtendedInfo,
  MovieProvidersResponse,
  MovieProvidersResponseResult,
} from 'src/app/models/interfaces/movie.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TMDBService {
  lastQueriedMovies: ReplaySubject<SearchMovieResponse | undefined> =
    new ReplaySubject<SearchMovieResponse | undefined>(1);
  lastQueriedMovie: ReplaySubject<Movie | undefined> = new ReplaySubject<
    Movie | undefined
  >(1);
  lastQueriedMovieExtended: ReplaySubject<MovieExtendedInfo | undefined> =
    new ReplaySubject<MovieExtendedInfo | undefined>(1);

  constructor(private http: HttpClient) {
    // re-hydration from storage
    const storedMovie = this.getStorageItem<Movie | undefined>('movie');
    if (storedMovie) {
      this.lastQueriedMovie.next(storedMovie);
      const storedMovieExtended = this.getStorageItem<
        MovieExtendedInfo | undefined
      >('movie');

      if (storedMovieExtended) {
        this.lastQueriedMovieExtended.next(storedMovieExtended);
      }
    }
  }

  setLastQueriedMovie = (movie: Movie | undefined) =>
    this.setSubject<Movie | undefined>('movie', movie, () =>
      this.lastQueriedMovie.next(movie)
    );
  setLastQueriedMovieExtendedInfo = (
    extendedInfo: MovieExtendedInfo | undefined
  ) =>
    this.setSubject<MovieExtendedInfo | undefined>(
      'movieExtended',
      extendedInfo,
      () => this.lastQueriedMovieExtended.next(extendedInfo)
    );

  movies = (query: string): Observable<SearchMovieResponse> => {
    const params = new HttpParams().append('query', query);

    return this.http
      .get<SearchMovieResponse>(`${environment.baseUrl}/search/movie`, {
        params,
      })
      .pipe(
        map((response: SearchMovieResponse) => {
          const mappedResponse = {
            ...response,
            results: response.results
              .filter((movie) => !!movie.poster_path)
              .sort((m1, m2) => m1.title.localeCompare(m2.title)),
          };

          return mappedResponse;
        }),
        tap((mappedResponse: SearchMovieResponse) =>
          this.lastQueriedMovies.next(mappedResponse)
        )
      );
  };

  movie = (movie_id: number): Observable<Movie> => {
    return this.http.get<Movie>(`${environment.baseUrl}/movie/${movie_id}`);
  };

  movieCredits = (movie_id: number): Observable<MovieCredits> => {
    return this.http.get<MovieCredits>(
      `${environment.baseUrl}/movie/${movie_id}/credits`
    );
  };

  similarMovies = (movie_id: number): Observable<SearchMovieResponse> => {
    return this.http.get<SearchMovieResponse>(
      `${environment.baseUrl}/movie/${movie_id}/similar`
    );
  };

  recommendedMovies = (movie_id: number): Observable<SearchMovieResponse> => {
    return this.http.get<SearchMovieResponse>(
      `${environment.baseUrl}/movie/${movie_id}/recommendations`
    );
  };

  watchProviders = (
    movie_id: number
  ): Observable<MovieProvidersResponseResult> => {
    return this.http
      .get<MovieProvidersResponse>(
        `${environment.baseUrl}/movie/${movie_id}/watch/providers`
      )
      .pipe(map((response: MovieProvidersResponse) => response.results['IT']));
  };

  private setSubject = <T>(
    key: string,
    value: T,
    callbackFn: () => void
  ): void => {
    if (typeof value !== 'undefined') {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }

    callbackFn();
  };

  private getStorageItem = <T>(key: string): T => {
    const localStr: string | null = localStorage.getItem(key);
    return localStr ? JSON.parse(localStr) : undefined;
  };
}
