import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookAddComponent } from './book-add/book-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadChildren: './books-list/books-list.module#BooksListModule'
  },
  {
    path: 'book-add',
    component: BookAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
    BookAddComponent,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
