import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHandlerComponent } from './list-handler.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ListHandlerComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ListHandlerComponent],
})
export class ListHandlerModule {}
