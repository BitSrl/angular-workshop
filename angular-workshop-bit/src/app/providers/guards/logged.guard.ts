import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, takeUntil, map } from "rxjs";
import { UnsubscriptionHandler } from "src/app/utilities/unsubscription-handler";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LoggedGuard extends UnsubscriptionHandler implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user$
    .pipe(
      takeUntil(this.destroy$),
      map(user => {
        if (!!user) {
          return true;
        } else {
          this.router.navigateByUrl('login');
          return false;
        }
      })
    )
  }
}