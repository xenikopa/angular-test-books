import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './appComponent/app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BooksListService } from './books-list.service';
import { IBooksListService } from './common/IBooksListService';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: IBooksListService, useClass: BooksListService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
