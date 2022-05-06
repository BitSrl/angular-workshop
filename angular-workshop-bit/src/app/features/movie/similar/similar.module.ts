import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimilarRoutingModule } from './similar-routing.module';
import { SimilarComponent } from './similar.component';
import { ListHandlerModule } from '../shared/list-handler/list-handler.module';
import { VoteAverageModule } from 'src/app/providers/pipes/vote-average/vote-average.module';

@NgModule({
  declarations: [SimilarComponent],
  imports: [CommonModule, SimilarRoutingModule, ListHandlerModule, VoteAverageModule],
})
export class SimilarModule {}
