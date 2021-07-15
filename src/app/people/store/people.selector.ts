import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PeopleState } from './people.state';

export const selectPeopleState = createFeatureSelector<PeopleState>('people');

export const selectPeople = createSelector(
  selectPeopleState,
  peopleState => peopleState.people
);

export const selectPeopleSearchTerm = createSelector(
  selectPeopleState,
  peopleState => peopleState.searchTerm
);

export const selectPeopleTotalResults = createSelector(
  selectPeopleState,
  peopleState => peopleState.totalResults
);
