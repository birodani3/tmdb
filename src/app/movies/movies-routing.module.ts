import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MoviesComponent } from './containers/movies/movies.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MoviesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
