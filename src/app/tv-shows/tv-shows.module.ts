import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './containers/tv-shows/tv-shows.component';
import { TvShowsEffects } from './store/tv-shows.effects';
import { tvShowsReducer } from './store/tv-shows.reducer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TvShowsComponent
  ],
  imports: [
    StoreModule.forFeature('tvShows', tvShowsReducer),
    EffectsModule.forFeature([TvShowsEffects]),
    ReactiveComponentModule,
    TvShowsRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class TvShowsModule { }
