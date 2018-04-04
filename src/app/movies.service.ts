import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MoviesService {

  private moviesUrl = 'api/movies';  // URL to web api
  private theatersUrl = 'api/theaters';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET movies from the server */
  getMovies() : any {
    return this.http.get<any>(this.moviesUrl);
  }

  /** GET theaters from the server */
  getTheaters() : any {
    return this.http.get<any>(this.theatersUrl);
  }

  /** GET movie by id */
  getMovie(id : number) : any {
    return this.http.get<any>(`${this.moviesUrl}/${id}`);
  }

  /** GET theater by id */
  getTheater(id : number) : any {
    return this.http.get<any>(`${this.theatersUrl}/${id}`);
  }

  /* GET movies whose title contains search term */
  searchMovies(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<any>(`${this.moviesUrl}/?title=${term}`);
  }
}
