import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PeopleComponent } from './containers/people/people.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PeopleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
