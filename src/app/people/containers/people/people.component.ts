import { Component, ChangeDetectionStrategy, HostListener, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { peopleInitAction, peopleLoadNextPageAction, peopleSearchTermChangeAction } from '../../store/people.actions';
import { selectPeople, selectPeopleSearchTerm, selectPeopleTotalResults } from '../../store/people.selector';
import { PeopleState } from '../../store/people.state';
import { appear } from '../../../shared/animations';

@Component({
  selector: 'tmdb-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appear],
})
export class PeopleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private bottom$ = new Subject<void>();
  public totalResults$ = this.store.select(selectPeopleTotalResults);
  public searchTerm$ = this.store.select(selectPeopleSearchTerm);
  public people$ = this.store.select(selectPeople);
  
  constructor(private store: Store<PeopleState>) {
    this.store.dispatch(peopleInitAction());

    this.bottom$.pipe(
      throttleTime(500),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.store.dispatch(peopleLoadNextPageAction());
    });
  }

  @HostListener('window:scroll')
  public onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight) {
      this.bottom$.next();
    }
  }

  public search(searchTerm: string): void {
    this.store.dispatch(peopleSearchTermChangeAction({ searchTerm }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
