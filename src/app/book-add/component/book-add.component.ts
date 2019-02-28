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
        image: document.getElementById('book-img')['src']
      };

      this.bookListService.addBook(book);

      this.route.navigateByUrl('/books');
    }
  }
  public onUploadImg(files: FileList): void {
    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = function () {
        const element: any = document.getElementById('book-img');
        element.src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  }
}
