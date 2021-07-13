import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'tmdb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() public cardData: any;
  public imageLoaded = false;

  constructor() { }
}
