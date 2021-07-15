import { createReducer, on } from '@ngrx/store';

import { getTvShowsSuccessAction, tvShowsLoadNextPageAction, tvShowsSearchTermChangeAction } from './tv-shows.actions';
import { TvShowsState } from './tv-shows.state';

export const initialTvShowsState: TvShowsState = {
  searchTerm: '',
  page: 1,
  totalPages: 1000,
  totalResults: 0,
  tvShows: [],
};

export const tvShowsReducer = createReducer(
  initialTvShowsState,

  on(tvShowsSearchTermChangeAction, (state, { searchTerm }) => ({
    ...state,
    page: 1,
    searchTerm
  })),

  on(getTvShowsSuccessAction, (state, { tvShows, totalPages, totalResults }) => ({
    ...state,
    totalPages,
    totalResults,
    tvShows: state.page === 1 ? tvShows : [...state.tvShows, ...tvShows],
  })),

  on(tvShowsLoadNextPageAction, (state) => ({
    ...state,
    page: state.page + 1
  })),
);
