import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { map, takeUntil } from 'rxjs';
import { AuthService } from '../providers/services/auth.service';
import { UnsubscriptionHandler } from '../utilities/unsubscription-handler';

@Directive({ selector: '[isLogged]' })
export class IsLoggedDirective extends UnsubscriptionHandler implements OnInit {
  ngOnInit(): void {
    this.authService.user$
      .pipe(
        takeUntil(this.destroy$),
        map((user) => !!user) // !!bitwise operator => convert to 1 or 0 => 0 = false
      )
      .subscribe({
        next: (logged: boolean) => {
          if (logged) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        },
      });
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    super();
  }
}
