import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAddComponent } from './component/book-add.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    BookAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookAddComponent,
      }
    ])
  ]
})
export class BookAddModule { }
