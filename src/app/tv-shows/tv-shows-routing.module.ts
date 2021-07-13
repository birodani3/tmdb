import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TvShowsComponent } from './containers/tv-shows/tv-shows.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TvShowsComponent,
    data: { animation: 'Third' }

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvShowsRoutingModule {}
