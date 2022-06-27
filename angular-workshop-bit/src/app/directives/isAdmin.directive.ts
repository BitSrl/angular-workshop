import { Directive, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { takeUntil } from "rxjs";
import { User } from "../models/interfaces/user.interface";
import { AuthService } from "../providers/services/auth.service";
import { UnsubscriptionHandler } from "../utilities/unsubscription-handler";

@Directive({ selector: '[isAdmin]' })
export class IsAdminDirective extends UnsubscriptionHandler implements OnInit {

  ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (user: User | null) => {
        if (!!user && user.role === 'admin') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else{
          this.viewContainer.clear();
        }
      }
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