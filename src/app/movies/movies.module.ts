import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './containers/movies/movies.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    MoviesRoutingModule,
    CommonModule,
    MatIconModule,
    SharedModule,
  ]
})
export class MoviesModule { }
