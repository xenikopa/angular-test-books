import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IBook } from 'src/app/common/IBook';
import { IBooksListService } from 'src/app/common/IBooksListService';
import { tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  public books$: Observable<Array<IBook>> =
    this.booksListService.getAllBooks()
      .pipe(
        debounceTime(700),
        tap(x => this.isLoading = false)
      );

  public isLoading =
    true;
  constructor(
    private booksListService: IBooksListService
  ) {
   }

}
