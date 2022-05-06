import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimilarComponent } from './similar.component';

const routes: Routes = [
  { path: '', component: SimilarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimilarRoutingModule { }
