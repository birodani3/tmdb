import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TvShowsState } from './tv-shows.state';

export const selectTvShowsState = createFeatureSelector<TvShowsState>('tvShows');

export const selectTvShows = createSelector(
  selectTvShowsState,
  tvShowsState => tvShowsState.tvShows
);

export const selectTvShowsSearchTerm = createSelector(
  selectTvShowsState,
  tvShowsState => tvShowsState.searchTerm
);

export const selectTvShowsTotalResults = createSelector(
  selectTvShowsState,
  tvShowsState => tvShowsState.totalResults
);
