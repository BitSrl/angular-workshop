import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailResolver } from 'src/app/providers/resolvers/movie-details.resolver';
import { CreditsComponent } from './credits/credits.component';
import { DetailsComponent } from './details/details.component';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  {
    path: ':id',
    component: MovieComponent,
    children: [
      {
        path: '',
        component: DetailsComponent,
        resolve: {
          movie: MovieDetailResolver
        },
      },
      {
        path: 'credits',
        component: CreditsComponent,
      },
      {
        path: 'similar',
        loadChildren: () => import('./similar/similar.module').then((m) => m.SimilarModule),
      },
      {
        path: 'recommended',
        loadChildren: () => import('./recommended/recommended.module').then((m) => m.RecommendedModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
