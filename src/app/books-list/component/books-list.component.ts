import { Component, OnInit } from '@angular/core';
import { IBooksListService } from '../common/IBooksListService';
import { Observable } from 'rxjs/internal/Observable';
import { IBook } from '../common/IBook';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  public books$: Observable<Array<IBook>> =
    this.booksListService.getAllBooks();

  constructor(
    private booksListService: IBooksListService
  ) {
   }

  ngOnInit() {
  }

}
