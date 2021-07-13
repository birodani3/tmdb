import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './containers/tv-shows/tv-shows.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TvShowsComponent
  ],
  imports: [
    TvShowsRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class TvShowsModule { }
