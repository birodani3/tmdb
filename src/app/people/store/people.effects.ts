import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { getPeopleSuccessAction, peopleLoadNextPageAction, peopleInitAction, peopleSearchTermChangeAction } from './people.actions';
import { MediaType, TimeWindow } from '../../shared/models';
import { selectPeopleState } from './people.selector';
import { PeopleState } from './people.state';
import { DaoService } from '../../shared/services/dao.service';

@Injectable()
export class PeopleEffects {
  constructor(private actions$: Actions, private store: Store<PeopleState>, private dao: DaoService) {}

  public loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(peopleInitAction, peopleSearchTermChangeAction, peopleLoadNextPageAction),
      withLatestFrom(this.store.select(selectPeopleState)),
      filter(([action, peopleState]) => {
        switch (action.type) {
          case peopleLoadNextPageAction.type:
            return peopleState.totalPages >= peopleState.page;
          case peopleInitAction.type:
            return !peopleState.people.length;
          default:
            return true;
        }
      }),
      switchMap(([action, peopleState]) => {
        return peopleState.searchTerm
          ? this.dao.searchPeople(peopleState.searchTerm, peopleState.page)
          : this.dao.getTrending(MediaType.Person, TimeWindow.Week, peopleState.page);
      }),
      map(response => {
        const people = (<any[]>response.results).map(result => ({
          id: result.id,
          title: result.name,
          overview: result.overview,
          background: `https://image.tmdb.org/t/p/w500${result.profile_path}`
        }));

        return getPeopleSuccessAction({ people, totalPages: response.total_pages, totalResults: response.total_results });
      })
    )
  );
}