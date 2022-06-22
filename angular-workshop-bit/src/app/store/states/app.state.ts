import { MovieState } from "./movie.state";
import { SystemState } from "./system.state";

export interface AppState {
  movie: MovieState;
  system: SystemState;
};