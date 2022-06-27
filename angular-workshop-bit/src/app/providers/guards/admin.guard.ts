import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, takeUntil } from "rxjs";
import { UnsubscriptionHandler } from "src/app/utilities/unsubscription-handler";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AdminGuard extends UnsubscriptionHandler implements CanActivate {
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
        if (!!user && user.role === 'admin') {
          return true;
        } else {
          this.router.navigateByUrl('home');
          return false;
        }
      })
    )
  }
}