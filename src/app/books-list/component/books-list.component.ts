import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IBook } from 'src/app/common/IBook';
import { IBooksListService } from 'src/app/common/IBooksListService';

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
