import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MediaType, TimeWindow } from '../models';

@Injectable({ providedIn: 'root' })
export class DaoService {
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly API_KEY = 'bdd14038d934bb932fd16722f2c670bf'

  constructor(private http: HttpClient) { }

  public getTrending(mediaType: MediaType, timeWindow: TimeWindow, page = 1): Observable<any> {
    return this.get(`/trending/${mediaType}/${timeWindow}?page=${page}`);
  }

  public searchMovies(searchTerm: string, page = 1): Observable<any> {
    return this.get(`/search/movie?query=${searchTerm}&page=${page}`);
  }

  public searchTvShows(searchTerm: string, page = 1): Observable<any> {
    return this.get(`/search/tv?query=${searchTerm}&page=${page}`);
  }

  public searchPeople(searchTerm: string, page = 1): Observable<any> {
    return this.get(`/search/person?query=${searchTerm}&page=${page}`);
  }

  private get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}${url}&api_key=${this.API_KEY}`);
  }
}
