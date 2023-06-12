import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import { Movie } from "src/app/models/interfaces/movie.interface";
import { MovieActions } from "src/app/store/action-types/movie.action-types";
import { selectCurrentMovie } from "src/app/store/selectors/movie.selectors";
import { AppState } from "src/app/store/states/app.state";
import { TMDBService } from "../services/tmdb.service";

@Injectable()
export class MovieDetailResolver implements Resolve<Movie | undefined> {
  constructor(
    private store: Store<AppState>,
    private tmdbService: TMDBService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id: number = +route.params['id'];
    // this.store.dispatch(MovieActions.GetSelectedMovie({ id }));
    return this.tmdbService.movie(id);
  }
}