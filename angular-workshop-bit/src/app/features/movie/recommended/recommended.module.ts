import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendedRoutingModule } from './recommended-routing.module';
import { RecommendedComponent } from './recommended.component';


@NgModule({
  declarations: [
    RecommendedComponent
  ],
  imports: [
    CommonModule,
    RecommendedRoutingModule
  ]
})
export class RecommendedModule { }
