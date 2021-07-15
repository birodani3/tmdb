import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './containers/movies/movies.component';
import { MoviesEffects } from './store/movies.effects';
import { moviesReducer } from './store/movies.reducer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    StoreModule.forFeature('movies', moviesReducer),
    EffectsModule.forFeature([MoviesEffects]),
    ReactiveComponentModule,
    MoviesRoutingModule,
    CommonModule,
    MatIconModule,
    SharedModule,
  ]
})
export class MoviesModule { }
