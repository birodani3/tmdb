import { createAction, props } from '@ngrx/store';

export enum PeopleActionTypes {
  PeopleInit = '[PEOPLE] init',
  PeopleSearchTermChange = '[PEOPLE] Search term change',
  PeopleLoadNextPage = '[PEOPLE] Load next page',
  GetPeopleSuccess = '[PEOPLE] Get people success'
}

export const peopleInitAction = createAction(
  PeopleActionTypes.PeopleInit,
);

export const peopleSearchTermChangeAction = createAction(
  PeopleActionTypes.PeopleSearchTermChange,
  props<{ searchTerm: string; }>()
);

export const peopleLoadNextPageAction = createAction(
  PeopleActionTypes.PeopleLoadNextPage,
);

export const getPeopleSuccessAction = createAction(
  PeopleActionTypes.GetPeopleSuccess,
  props<{ people: any[]; totalPages: number; totalResults: number; }>()
);
