import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { RuntimePipeModule } from 'src/app/providers/pipes/runtime/runtime-pipe.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { VoteAverageModule } from 'src/app/providers/pipes/vote-average/vote-average.module';
import { DetailsComponent } from './details/details.component';
import { CreditsComponent } from './credits/credits.component';
import { ListHandlerModule } from './shared/list-handler/list-handler.module';
import { DetailsDividerComponent } from './details/details-divider/details-divider.component';
import { DetailsInfoItemComponent } from './details/details-info-item/details-info-item.component';
import { MovieHeadingComponent } from './details/movie-heading/movie-heading.component';
import { MovieCastComponent } from './details/movie-cast/movie-cast.component';
import { MovieWatchProvidersItemComponent } from './details/movie-watch-providers-item/movie-watch-providers-item.component';
import { MoviesListComponent } from './details/movies-list/movies-list.component';

@NgModule({
  declarations: [
    MovieComponent,
    DetailsComponent,
    CreditsComponent,
    DetailsDividerComponent,
    DetailsInfoItemComponent,
    MovieHeadingComponent,
    MovieCastComponent,
    MovieWatchProvidersItemComponent,
    MoviesListComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    RuntimePipeModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    VoteAverageModule,
    ListHandlerModule,
  ],
})
export class MovieModule {}
