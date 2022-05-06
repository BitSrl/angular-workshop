import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendedRoutingModule } from './recommended-routing.module';
import { RecommendedComponent } from './recommended.component';
import { ListHandlerModule } from '../shared/list-handler/list-handler.module';
import { VoteAverageModule } from 'src/app/providers/pipes/vote-average/vote-average.module';

@NgModule({
  declarations: [RecommendedComponent],
  imports: [CommonModule, RecommendedRoutingModule, ListHandlerModule, VoteAverageModule],
})
export class RecommendedModule {}
