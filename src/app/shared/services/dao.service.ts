import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MediaType, TimeWindow } from '../models';

@Injectable({ providedIn: 'root' })
export class DaoService {
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly API_KEY = 'bdd14038d934bb932fd16722f2c670bf'

  constructor(private http: HttpClient) { }

  public getTrending(mediaType: MediaType, timeWindow: TimeWindow): Observable<any> {
    return this.get(`/trending/${mediaType}/${timeWindow}`);
  }

  public searchMovies(searchTerm: string): Observable<any> {
    return this.get(`/search/movie?query=${searchTerm}`);
  }

  public searchTvShows(searchTerm: string): Observable<any> {
    return this.get(`/search/tv?query=${searchTerm}`);
  }

  public searchPeople(searchTerm: string): Observable<any> {
    return this.get(`/search/person?query=${searchTerm}`);
  }

  private get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}${url}${url.includes('?') ? '&' : '?'}api_key=${this.API_KEY}`);
  }
}
