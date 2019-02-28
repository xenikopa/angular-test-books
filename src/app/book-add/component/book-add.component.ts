import { Component, OnInit } from '@angular/core';
import { IBooksListService } from 'src/app/common/IBooksListService';
import { NgForm } from '@angular/forms';
import { IBook } from 'src/app/common/IBook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: [
    '../../books-list/book-item/book-item.component.scss'
  ]
})
export class BookAddComponent {
  public isInvalidYear =
    false;

  public isInvalidPageCount =
    false;
  constructor(
    private bookListService: IBooksListService,
    private route: Router
  ) { }

  public onClickSave(form: NgForm): void {
    const { author, code, description,
      name, pageCount, publishYear, publisher
    } = form.form.value;
    this.isInvalidYear = publishYear < 1990 || publishYear > 2019;
    this.isInvalidPageCount = pageCount < 1;
    if (form.valid && !this.isInvalidYear) {
      const book: IBook = {
        id: 0, author, code, description,
        name, pageCount, publishYear, publisher,
        rate: 0,
      };

      this.bookListService.addBook(book);

      this.route.navigateByUrl('/books');
    }
  }
}
