import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimilarRoutingModule } from './similar-routing.module';
import { SimilarComponent } from './similar.component';


@NgModule({
  declarations: [
    SimilarComponent
  ],
  imports: [
    CommonModule,
    SimilarRoutingModule
  ]
})
export class SimilarModule { }
