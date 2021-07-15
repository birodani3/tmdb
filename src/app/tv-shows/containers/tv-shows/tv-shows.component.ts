import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { tvShowsInitAction, tvShowsLoadNextPageAction, tvShowsSearchTermChangeAction } from '../../store/tv-shows.actions';
import { selectTvShows, selectTvShowsSearchTerm, selectTvShowsTotalResults } from '../../store/tv-shows.selector';
import { TvShowsState } from '../../store/tv-shows.state';
import { appear } from '../../../shared/animations';

@Component({
  selector: 'tmdb-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appear]
})
export class TvShowsComponent {
  private destroy$ = new Subject<void>();
  private bottom$ = new Subject<void>();
  public totalResults$ = this.store.select(selectTvShowsTotalResults);
  public searchTerm$ = this.store.select(selectTvShowsSearchTerm);
  public tvShows$ = this.store.select(selectTvShows);
  
  constructor(private store: Store<TvShowsState>) {
    this.store.dispatch(tvShowsInitAction());

    this.bottom$.pipe(
      throttleTime(500),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.store.dispatch(tvShowsLoadNextPageAction());
    });
  }

  @HostListener('window:scroll')
  public onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight) {
      this.bottom$.next();
    }
  }

  public search(searchTerm: string): void {
    this.store.dispatch(tvShowsSearchTermChangeAction({ searchTerm }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
