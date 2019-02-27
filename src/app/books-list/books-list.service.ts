import { Injectable } from '@angular/core';
import { IBooksListService } from './common/IBooksListService';
import { HttpClient } from '@angular/common/http';
import { IBook } from './common/IBook';
import { Observable } from 'rxjs/internal/Observable';
import { of, ReplaySubject, Subject } from 'rxjs';
import {map, catchError, first} from 'rxjs/operators';
import { isUndefined } from 'util';
@Injectable()
export class BooksListService extends IBooksListService {
  private allBooks$: Subject<Array<IBook>> =
    new ReplaySubject(1);
  constructor(
    private httpClient: HttpClient
  ) {
    super();

    this.getAllBooks()
      .pipe(first())
      .subscribe(x => this.allBooks$.next(x));
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

  public getBookById(id: number): Observable<IBook> {
    return this.allBooks$.pipe(
      map(x => x.find(item => item.id === id)),
      map(x => isUndefined(x) ? null : x)
    );
  }
}
