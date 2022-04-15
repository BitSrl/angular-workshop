export interface SearchMovieResponse {
  page: number;
  results: Array<SearchMovieResult>;
  total_results: number;
  total_pages: number;
}

export interface SearchMovieResult {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}
