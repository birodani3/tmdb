import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { getTvShowsSuccessAction, tvShowsLoadNextPageAction, tvShowsInitAction, tvShowsSearchTermChangeAction } from './tv-shows.actions';
import { MediaType, TimeWindow } from '../../shared/models';
import { selectTvShowsState } from './tv-shows.selector';
import { TvShowsState } from './tv-shows.state';
import { DaoService } from '../../shared/services/dao.service';

@Injectable()
export class TvShowsEffects {
  constructor(private actions$: Actions, private store: Store<TvShowsState>, private dao: DaoService) {}

  public loadTvShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tvShowsInitAction, tvShowsSearchTermChangeAction, tvShowsLoadNextPageAction),
      withLatestFrom(this.store.select(selectTvShowsState)),
      filter(([action, tvShowsState]) => {
        return action.type === tvShowsLoadNextPageAction.type ? tvShowsState.totalPages >= tvShowsState.page : true;
      }),
      switchMap(([action, tvShowsState]) => {
        return tvShowsState.searchTerm
          ? this.dao.searchTvShows(tvShowsState.searchTerm, tvShowsState.page)
          : this.dao.getTrending(MediaType.Tv, TimeWindow.Week, tvShowsState.page);
      }),
      map(response => {
        const tvShows = (<any[]>response.results).map(result => ({
          id: result.id,
          title: result.original_name,
          vote: result.vote_average,
          overview: result.overview,
          background: `https://image.tmdb.org/t/p/w500${result.poster_path}`
        }))

        return getTvShowsSuccessAction({ tvShows, totalPages: response.total_pages, totalResults: response.total_results });
      })
    )
  );
}