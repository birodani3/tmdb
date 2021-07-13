import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaType, TimeWindow } from 'src/app/shared/models';

import { appear } from '../../../shared/animations';
import { DaoService } from '../../../shared/services/dao.service';

@Component({
  selector: 'tmdb-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appear]
})
export class TvShowsComponent {
  public tvShows$: Observable<any[]> | undefined;
  public searchTerm: string | undefined;
  
  constructor(private dao: DaoService) {
    this.search();
  }

  public search(searchTerm?: string): void {
    this.searchTerm = searchTerm;

    this.tvShows$ = (searchTerm ? this.dao.searchTvShows(searchTerm) : this.dao.getTrending(MediaType.Tv, TimeWindow.Week)).pipe(
      map(resp => {
        return (<any[]>resp.results).map(result => ({
          id: result.id,
          title: result.original_name,
          vote: result.vote_average,
          overview: result.overview,
          background: `https://image.tmdb.org/t/p/w500${result.poster_path}`
        }))
      })
    );
  }

}
