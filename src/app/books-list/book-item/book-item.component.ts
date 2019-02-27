import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, filter, concatMap } from 'rxjs/operators';
import { isNull } from 'util';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { IBook } from 'src/app/common/IBook';
import { IBooksListService } from 'src/app/common/IBooksListService';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent {
  public bookItem$: Observable<IBook> =
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      filter(x => !isNull(x)),
      map(x => parseInt(x, 10)),
      concatMap(x => this.bookListService.getBookById(x))
    );

  public isReadState = true;
  constructor(
    private route: ActivatedRoute,
    private bookListService: IBooksListService
  ) { }

  public onClickCancel(): void {
    this.isReadState = true;
  }
  public onClickSave(form: NgForm): void {
    this.isReadState = true;
  }
  public onClickEdit(): void {
    this.isReadState = false;
  }
}
