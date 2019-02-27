import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of, ReplaySubject, Subject } from 'rxjs';
import {map, catchError, first} from 'rxjs/operators';
import { isUndefined } from 'util';
import { IBooksListService } from './common/IBooksListService';
import { IBook } from './common/IBook';
@Injectable()
export class BooksListService extends IBooksListService {
  private allBooks$: Subject<Array<IBook>> =
    new ReplaySubject(1);

  private allBooks: Array<IBook> = [];
  constructor(
    private httpClient: HttpClient
  ) {
    super();

    this.getJsonBooks()
      .pipe(first())
      .subscribe(x => {
        this.allBooks$.next(x);
        this.allBooks = x;
      });
  }

  public getAllBooks(): Observable<Array<IBook>> {
    return this.allBooks$.asObservable();
  }

  public getBookById(id: number): Observable<IBook> {
    return this.allBooks$.pipe(
      map(x => x.find(item => item.id === id)),
      map(x => isUndefined(x) ? null : x)
    );
  }

  public addBook(book: IBook): void {
    const item: IBook = {
        id: this.allBooks.length,
        ...book
      };
    this.allBooks.push(item);
    this.allBooks$.next(this.allBooks);
  }


  private getJsonBooks(): Observable<Array<IBook>> {
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
