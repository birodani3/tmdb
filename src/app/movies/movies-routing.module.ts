import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MoviesComponent } from './containers/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MoviesComponent
  },
  {
    path: ':id',
    component: MovieComponent,
    data: { animation: 'Details' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
