import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IsAdminDirective } from "./isAdmin.directive";
import { IsLoggedDirective } from "./isLogged.directive";

@NgModule({
  declarations: [IsAdminDirective, IsLoggedDirective],
  imports: [CommonModule],
  exports: [IsAdminDirective, IsLoggedDirective]
})
export class DirectivesModule {}