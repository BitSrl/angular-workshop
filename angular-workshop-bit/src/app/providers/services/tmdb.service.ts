import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { SearchMovieResponse } from "src/app/models/interfaces/search-movie-response.interface";
import { Movie, MovieCredits } from "src/app/models/interfaces/movie.interface";

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private lastQueriedMovies: SearchMovieResponse | undefined;
  private lastQueriedMovie: Movie | undefined;

  constructor(private http: HttpClient) {}

  getLastQueriedMovies = (): SearchMovieResponse | undefined => this.lastQueriedMovies;
  getLastQueriedMovie = (): Movie | undefined => this.lastQueriedMovie;
  resetLastQueriedMovie = (): void => this.lastQueriedMovie = undefined;
  // configuration = (): Observable<any> => {
  //   return this.http.get<any>(`${environment.baseUrl}/configuration`)
  //   .pipe()
  // }
  // requestToken = (): Observable<any> => this.http.post<any>(`${environment.baseUrl}`)
  movies = (query: string): Observable<SearchMovieResponse> => {
    const params = new HttpParams()
      .append('api_key', environment.apiKey)
      .append('query', query);
      
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
    const params = new HttpParams().append('api_key', environment.apiKey);
    return this.http.get<Movie>(`${environment.baseUrl}/movie/${movie_id}`, { params })
    .pipe(
      tap((movie: Movie) => this.lastQueriedMovie = movie)
    );
  };

  movieCredits = (movie_id: number): Observable<MovieCredits> => {
    const params = new HttpParams().append('api_key', environment.apiKey);
    return this.http.get<MovieCredits>(`${environment.baseUrl}/movie/${movie_id}/credits`, { params });
  };

  similarMovies = (movie_id: number): Observable<SearchMovieResponse> => {
    const params = new HttpParams().append('api_key', environment.apiKey);
    return this.http.get<SearchMovieResponse>(`${environment.baseUrl}/movie/${movie_id}/similar`, { params });
  };

  recommendedMovies = (movie_id: number): Observable<SearchMovieResponse> => {
    const params = new HttpParams().append('api_key', environment.apiKey);
    return this.http.get<SearchMovieResponse>(`${environment.baseUrl}/movie/${movie_id}/recommendations`, { params });
  };
}