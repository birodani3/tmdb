import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './containers/people/people.component';
import { PeopleEffects } from './store/people.effects';
import { peopleReducer } from './store/people.reducer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PeopleComponent
  ],
  imports: [
    StoreModule.forFeature('people', peopleReducer),
    EffectsModule.forFeature([PeopleEffects]),
    ReactiveComponentModule,
    CommonModule,
    PeopleRoutingModule,
    SharedModule
  ]
})
export class PeopleModule { }
