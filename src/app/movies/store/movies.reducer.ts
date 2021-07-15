import { createReducer, on } from '@ngrx/store';

import { getMoviesSuccessAction, moviesLoadNextPageAction, moviesSearchTermChangeAction } from './movies.actions';
import { MoviesState } from './movies.state';

export const initialMoviesState: MoviesState = {
  searchTerm: '',
  page: 1,
  totalPages: 1000,
  totalResults: 0,
  movies: [],
};

export const moviesReducer = createReducer(
  initialMoviesState,

  on(moviesSearchTermChangeAction, (state, { searchTerm }) => ({
    ...state,
    page: 1,
    searchTerm
  })),

  on(getMoviesSuccessAction, (state, { movies, totalPages, totalResults }) => ({
    ...state,
    totalPages,
    totalResults,
    movies: state.page === 1 ? movies : [...state.movies, ...movies],
  })),

  on(moviesLoadNextPageAction, (state) => ({
    ...state,
    page: state.page + 1
  })),
);
