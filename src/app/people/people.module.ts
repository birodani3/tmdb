import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './containers/people/people.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PeopleComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule
  ]
})
export class PeopleModule { }
