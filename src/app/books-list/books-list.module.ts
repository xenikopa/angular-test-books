import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './component/books-list.component';
import { RouterModule } from '@angular/router';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { BookItemComponent } from './book-item/book-item.component';
import {FileUploadModule} from 'primeng/fileupload';
@NgModule({
  declarations: [
    BooksListComponent,
    BookItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RatingModule,
    RouterModule.forChild([
      {
        path: '',
        component: BooksListComponent,
      },
      {
        path: ':id',
        component: BookItemComponent,
      }
    ])
  ],
})
export class BooksListModule { }
