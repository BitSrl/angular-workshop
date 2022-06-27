import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "src/app/directives/directives.module";
import { HeaderComponent } from "./header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [RouterModule, MatToolbarModule, DirectivesModule],
  exports: [HeaderComponent],
})
export class HeaderModule { }