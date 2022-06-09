import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from "rxjs";
import { SearchMovieResponse } from "src/app/models/interfaces/search-movie-response.interface";
import { Movie, MovieCredits, MovieProvidersResponse, MovieProvidersResponseResult } from "src/app/models/interfaces/movie.interface";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private lastQueriedMovies: SearchMovieResponse | undefined;
  private _lastQueriedMovie: Movie | undefined;
  private get lastQueriedMovie(): Movie | undefined {
    return this._lastQueriedMovie;
  };
  private set lastQueriedMovie(movie: Movie | undefined) {
    if (typeof movie !== 'undefined') {
      localStorage.removeItem('movie');
      localStorage.setItem('movie', JSON.stringify(movie));
    } else {
      localStorage.removeItem('movie');
    }

    this._lastQueriedMovie = movie;
  }

  constructor(private http: HttpClient) {
    const movieStr: string | null = localStorage.getItem('movie');
    if (movieStr) {
      const storedMovie: Movie | undefined = JSON.parse(movieStr);
  
      if (storedMovie) {
        this.lastQueriedMovie = storedMovie;
      }
    }
  }

  getLastQueriedMovies = (): SearchMovieResponse | undefined => this.lastQueriedMovies;
  getLastQueriedMovie = (): Movie | undefined => this.lastQueriedMovie;
  resetLastQueriedMovie = (): void => this.lastQueriedMovie = undefined;
  // configuration = (): Observable<any> => {
  //   return this.http.get<any>(`${environment.baseUrl}/configuration`)
  //   .pipe()
  // }
  // requestToken = (): Observable<any> => this.http.post<any>(`${environment.baseUrl}`)
  movies = (query: string): Observable<SearchMovieResponse> => {
    const params = new HttpParams().append('query', query);
      
    return this.http.get<SearchMovieResponse>(`${environment.baseUrl}/search/movie`, { params })
    .pipe(
      map((response: SearchMovieResponse) => {
        const mappedResponse = {
          ...response,
          results: response.results.filter(movie => !!movie.poster_path).sort((m1, m2) => m1.title.localeCompare(m2.title))
        };
        
        this.lastQueriedMovies = mappedResponse;
        return mappedResponse;
      }));
  };

  movie = (movie_id: number): Observable<Movie> => {
    return this.http.get<Movie>(`${environment.baseUrl}/movie/${movie_id}`)
    .pipe(
      tap((movie: Movie) => this.lastQueriedMovie = movie)
    );
  };

  movieCredits = (movie_id: number): Observable<MovieCredits> => {
    return this.http.get<MovieCredits>(`${environment.baseUrl}/movie/${movie_id}/credits`);
  };

  similarMovies = (movie_id: number): Observable<SearchMovieResponse> => {
    return this.http.get<SearchMovieResponse>(`${environment.baseUrl}/movie/${movie_id}/similar`);
  };

  recommendedMovies = (movie_id: number): Observable<SearchMovieResponse> => {
    return this.http.get<SearchMovieResponse>(`${environment.baseUrl}/movie/${movie_id}/recommendations`);
  };

  watchProviders = (movie_id: number): Observable<MovieProvidersResponseResult> => {
    return this.http.get<MovieProvidersResponse>(`${environment.baseUrl}/movie/${movie_id}/watch/providers`)
    .pipe(
      map((response: MovieProvidersResponse) => response.results['IT'])
    );
  };
}