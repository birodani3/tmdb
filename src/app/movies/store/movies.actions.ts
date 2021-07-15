import { createAction, props } from '@ngrx/store';

export enum MoviesActionTypes {
  MoviesInit = '[MOVIES] init',
  MoviesSearchTermChange = '[MOVIES] Search term change',
  MoviesLoadNextPage = '[MOVIES] Load next page',
  GetMoviesSuccess = '[MOVIES] Get movies success'
}

export const moviesInitAction = createAction(
  MoviesActionTypes.MoviesInit,
);

export const moviesSearchTermChangeAction = createAction(
  MoviesActionTypes.MoviesSearchTermChange,
  props<{ searchTerm: string; }>()
);

export const moviesLoadNextPageAction = createAction(
  MoviesActionTypes.MoviesLoadNextPage,
);

export const getMoviesSuccessAction = createAction(
  MoviesActionTypes.GetMoviesSuccess,
  props<{ movies: any[]; totalPages: number; totalResults: number; }>()
);
