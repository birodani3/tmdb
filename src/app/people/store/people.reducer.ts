import { createReducer, on } from '@ngrx/store';

import { getPeopleSuccessAction, peopleLoadNextPageAction, peopleSearchTermChangeAction } from './people.actions';
import { PeopleState } from './people.state';

export const initialPeopleState: PeopleState = {
  searchTerm: '',
  page: 1,
  totalPages: 1000,
  totalResults: 0,
  people: [],
};

export const peopleReducer = createReducer(
  initialPeopleState,

  on(peopleSearchTermChangeAction, (state, { searchTerm }) => ({
    ...state,
    page: 1,
    searchTerm
  })),

  on(getPeopleSuccessAction, (state, { people, totalPages, totalResults }) => ({
    ...state,
    totalPages,
    totalResults,
    people: state.page === 1 ? people : [...state.people, ...people]
  })),

  on(peopleLoadNextPageAction, (state) => ({
    ...state,
    page: state.page + 1
  })),
);
