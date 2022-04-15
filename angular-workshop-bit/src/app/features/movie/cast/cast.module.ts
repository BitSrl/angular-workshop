import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CastRoutingModule } from './cast-routing.module';
import { CastComponent } from './cast.component';


@NgModule({
  declarations: [
    CastComponent
  ],
  imports: [
    CommonModule,
    CastRoutingModule
  ]
})
export class CastModule { }
