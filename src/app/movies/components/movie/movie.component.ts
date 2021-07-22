import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DaoService } from '../../../shared/services/dao.service';

@Component({
  selector: 'tmdb-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  public movie$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute, private dao: DaoService) {
    const movieId = this.activatedRoute.snapshot.params.id;

    this.movie$ = this.dao.getMovie(movieId).pipe(
      map(movie => ({
        ...movie,
        genreNames: movie.genres.map((genre: any) => genre.name).join(', '),
      }))
    );
  }
}
