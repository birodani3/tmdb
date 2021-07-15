import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';

const SHARED_CLASSES = [
  SearchBarComponent,
  HeaderComponent,
  CardComponent,
];

@NgModule({
  declarations: [...SHARED_CLASSES],
  exports: [...SHARED_CLASSES],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SharedModule { }
