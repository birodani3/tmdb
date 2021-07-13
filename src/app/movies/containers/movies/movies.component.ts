import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MediaType, TimeWindow } from '../../../shared/models';
import { DaoService } from '../../../shared/services/dao.service';
import { appear } from '../../../shared/animations';

@Component({
  selector: 'tmdb-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appear],
})
export class MoviesComponent {
  public movies$: Observable<any[]> | undefined;
  public searchTerm: string | undefined;
  
  constructor(private dao: DaoService) {
    this.search();
  }

  public search(searchTerm?: string): void {
    const request = searchTerm ? this.dao.searchMovies(searchTerm) : this.dao.getTrending(MediaType.Movie, TimeWindow.Week);

    this.searchTerm = searchTerm;
    this.movies$ = request.pipe(
      map(resp => {
        return (<any[]>resp.results).map(result => ({
          id: result.id,
          title: result.original_title,
          vote: result.vote_average,
          overview: result.overview,
          background: `https://image.tmdb.org/t/p/w500${result.poster_path}`
        }))
      })
    );
  }
}
