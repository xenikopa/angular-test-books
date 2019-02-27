import { Injectable } from '@angular/core';
import { IBooksListService } from './common/IBooksListService';
import { HttpClient } from '@angular/common/http';
import { IBook } from './common/IBook';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
@Injectable()
export class BooksListService extends IBooksListService {
  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  public getAllBooks(): Observable<Array<IBook>> {
    return this.httpClient.get<{books: Array<IBook>}>('assets/common/books.json')
      .pipe(
        map(x => x.books),
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
  }
}
