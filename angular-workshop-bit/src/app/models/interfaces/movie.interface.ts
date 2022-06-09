export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Array<Genre>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<ProductionCountry>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguage>;
  status: MovieStatus;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export type MovieStatus = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

export interface MovieCredits {
  id: number;
  cast: Array<MovieCast>;
  crew: Array<MovieCrew>;
}

interface BaseMoviePeople {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
}

export interface MovieCast extends BaseMoviePeople {
  cast_id: number;
  character: string;
  order: number;
}

export interface MovieCrew extends BaseMoviePeople {
  department: string;
  job: string;
}

export interface MovieProvidersResponse {
  id: number;
  results: { [key: string]: MovieProvidersResponseResult };
}

export interface MovieProvidersResponseResult {
  link?: string;
  flatrate?: Array<MovieProvidersResponseItem>;
  rent?: Array<MovieProvidersResponseItem>;
  buy?: Array<MovieProvidersResponseItem>;
}

export interface MovieProvidersResponseItem {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}