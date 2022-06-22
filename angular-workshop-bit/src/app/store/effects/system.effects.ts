import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { SystemActions } from '../action-types/system.action-types';

@Injectable()
export class SystemEffects {
  constructor(private actions$: Actions, private router: Router) {}

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SystemActions.Redirect),
        tap(({ url }) => this.router.navigateByUrl(url))
      ),
    { dispatch: false }
  );
}
