import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MediaType, TimeWindow } from '../../../shared/models';
import { DaoService } from '../../../shared/services/dao.service';
import { appear } from '../../../shared/animations';

@Component({
  selector: 'tmdb-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appear],
})
export class PeopleComponent {
  public people$: Observable<any[]> | undefined;
  public searchTerm: string | undefined;
  
  constructor(private dao: DaoService) {
    this.search();
  }

  public search(searchTerm?: string): void {
    const request = searchTerm ? this.dao.searchPeople(searchTerm) : this.dao.getTrending(MediaType.Person, TimeWindow.Week);

    this.searchTerm = searchTerm;
    this.people$ = request.pipe(
      map(resp => {
        return (<any[]>resp.results).map(result => ({
          id: result.id,
          title: result.name,
          overview: result.overview,
          background: `https://image.tmdb.org/t/p/w500${result.profile_path}`
        }))
      })
    );
  }
}
