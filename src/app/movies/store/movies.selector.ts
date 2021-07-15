import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MoviesState } from './movies.state';

export const selectMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectMovies = createSelector(
  selectMoviesState,
  moviesState => moviesState.movies
);

export const selectMoviesSearchTerm = createSelector(
  selectMoviesState,
  moviesState => moviesState.searchTerm
);

export const selectMoviesTotalResults = createSelector(
  selectMoviesState,
  moviesState => moviesState.totalResults
);
