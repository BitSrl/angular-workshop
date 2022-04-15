import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'cast', loadChildren: () => import('./cast/cast.module').then((m) => m.CastModule) },
  { path: 'similar', loadChildren: () => import('./similar/similar.module').then((m) => m.SimilarModule) },
  { path: 'recommended', loadChildren: () => import('./recommended/recommended.module').then((m) => m.RecommendedModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
