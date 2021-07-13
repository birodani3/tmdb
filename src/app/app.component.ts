import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { slideIn } from './shared/animations';

@Component({
  selector: 'tmdb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn]
})
export class AppComponent {
  constructor() { }

  public prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }
}
