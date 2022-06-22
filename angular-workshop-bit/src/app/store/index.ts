import { ActionReducerMap } from "@ngrx/store";
import { StoreDevtoolsConfig } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { MovieEffects } from "./effects/movie.effects";
import { SystemEffects } from "./effects/system.effects";
import { movieReducers } from "./reducers/movie.reducers";
import { systemReducers } from "./reducers/system.reducers";
import { AppState } from "./states/app.state";

export const reducers: ActionReducerMap<AppState> = {
  movie: movieReducers,
  system: systemReducers
};

export const effects: Array<any> = [
  MovieEffects,
  SystemEffects
];

export const devtoolsConfig: StoreDevtoolsConfig = {
  maxAge: 25,
  logOnly: environment.production,
};