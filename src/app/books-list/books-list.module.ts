import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './component/books-list.component';
import { RouterModule } from '@angular/router';
import { BooksListService } from './books-list.service';
import { IBooksListService } from './common/IBooksListService';
import {HttpClientModule} from '@angular/common/http';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BooksListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    RouterModule.forChild([
      {
        path: '',
        component: BooksListComponent,
      },
    ])
  ],
  providers: [
    { provide: IBooksListService, useClass: BooksListService}
  ]
})
export class BooksListModule { }
