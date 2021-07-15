import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { getMoviesSuccessAction, moviesLoadNextPageAction, moviesInitAction, moviesSearchTermChangeAction } from './movies.actions';
import { MediaType, TimeWindow } from '../../shared/models';
import { selectMoviesState } from './movies.selector';
import { MoviesState } from './movies.state';
import { DaoService } from '../../shared/services/dao.service';

@Injectable()
export class MoviesEffects {
  constructor(private actions$: Actions, private store: Store<MoviesState>, private dao: DaoService) {}

  public loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesInitAction, moviesSearchTermChangeAction, moviesLoadNextPageAction),
      withLatestFrom(this.store.select(selectMoviesState)),
      filter(([action, moviesState]) => {
        switch (action.type) {
          case moviesLoadNextPageAction.type:
            return moviesState.totalPages >= moviesState.page;
          case moviesInitAction.type:
            return !moviesState.movies.length;
          default:
            return true;
        }
      }),
      switchMap(([action, moviesState]) => {
        return moviesState.searchTerm
          ? this.dao.searchMovies(moviesState.searchTerm, moviesState.page)
          : this.dao.getTrending(MediaType.Movie, TimeWindow.Week, moviesState.page);
      }),
      map(response => {
        const movies = (<any[]>response.results).map(result => ({
          id: result.id,
          title: result.original_title,
          vote: result.vote_average,
          overview: result.overview,
          background: `https://image.tmdb.org/t/p/w500${result.poster_path}`
        }));

        return getMoviesSuccessAction({ movies, totalPages: response.total_pages, totalResults: response.total_results });
      })
    )
  );
}