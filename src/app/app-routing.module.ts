import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then((m) => m.MoviesModule),
    data: { animation: 'Second' }
  },
  {
    path: 'tv-shows',
    loadChildren: () => import('./tv-shows/tv-shows.module').then((m) => m.TvShowsModule),
    data: { animation: 'Third' }
  },
  {
    path: 'people',
    loadChildren: () => import('./people/people.module').then((m) => m.PeopleModule),
    data: { animation: 'Fourth' }
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
