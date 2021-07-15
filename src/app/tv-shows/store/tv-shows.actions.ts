import { createAction, props } from '@ngrx/store';

export enum TvShowsActionTypes {
  TvShowsInit = '[TVSHOWS] init',
  TvShowsSearchTermChange = '[TVSHOWS] Search term change',
  TvShowsLoadNextPage = '[TVSHOWS] Load next page',
  GetTvShowsSuccess = '[TVSHOWS] Get tv shows success'
}

export const tvShowsInitAction = createAction(
  TvShowsActionTypes.TvShowsInit,
);

export const tvShowsSearchTermChangeAction = createAction(
  TvShowsActionTypes.TvShowsSearchTermChange,
  props<{ searchTerm: string; }>()
);

export const tvShowsLoadNextPageAction = createAction(
  TvShowsActionTypes.TvShowsLoadNextPage,
);

export const getTvShowsSuccessAction = createAction(
  TvShowsActionTypes.GetTvShowsSuccess,
  props<{ tvShows: any[]; totalPages: number; totalResults: number; }>()
);
