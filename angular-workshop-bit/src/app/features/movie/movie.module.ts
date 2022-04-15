import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { RuntimePipeModule } from 'src/app/providers/pipes/runtime/runtime-pipe.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { VoteAverageModule } from 'src/app/providers/pipes/vote-average/vote-average.module';

@NgModule({
  declarations: [MovieComponent],
  imports: [CommonModule, MovieRoutingModule, RuntimePipeModule, MatCardModule, FlexLayoutModule, MatButtonModule, VoteAverageModule],
})
export class MovieModule {}
