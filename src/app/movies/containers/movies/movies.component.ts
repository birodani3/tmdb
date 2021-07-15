import { Component, ChangeDetectionStrategy, HostListener, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { moviesInitAction, moviesSearchTermChangeAction, moviesLoadNextPageAction } from '../../store/movies.actions';
import { selectMovies, selectMoviesSearchTerm, selectMoviesTotalResults } from '../../store/movies.selector';
import { MoviesState } from '../../store/movies.state';
import { appear } from '../../../shared/animations';

@Component({
  selector: 'tmdb-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appear],
})
export class MoviesComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private bottom$ = new Subject<void>();
  public totalResults$ = this.store.select(selectMoviesTotalResults);
  public searchTerm$ = this.store.select(selectMoviesSearchTerm);
  public movies$ = this.store.select(selectMovies);
  
  constructor(private store: Store<MoviesState>) {
    this.store.dispatch(moviesInitAction());

    this.bottom$.pipe(
      throttleTime(500),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.store.dispatch(moviesLoadNextPageAction());
    });
  }

  @HostListener('window:scroll')
  public onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight) {
      this.bottom$.next();
    }
  }

  public search(searchTerm: string): void {
    this.store.dispatch(moviesSearchTermChangeAction({ searchTerm }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
