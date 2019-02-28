import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { IBooksListService } from 'src/app/common/IBooksListService';
import { BooksListService } from 'src/app/books-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IBook } from 'src/app/common/IBook';
import { of } from 'rxjs';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        RatingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: IBooksListService, useClass: BooksListService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect set correct img', () => {
    const books: Array<IBook> = [
      {
        id: 0, name: 'TestBook3', description: 'Description3', author: 'Author2',
        publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
      },
      {
        id: 1, name: 'TestBook3', description: 'Description3', author: 'Author2',
        publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3, image: 'src/test'
      }
    ];
    component.books$ = of(books);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const firstElementImg: Element = compiled.querySelector('.books-list__item:first-child img');

    expect(firstElementImg.getAttribute('src')).toContain('/assets/common/img/noImg.png');

    const lastElementImg: Element = compiled.querySelector('.books-list__item:last-child img');

    expect(lastElementImg.getAttribute('src')).toContain('src/test');
  });

  it('expect set correct links to items', () => {
    const books: Array<IBook> = [
      {
        id: 0, name: 'TestBook3', description: 'Description3', author: 'Author2',
        publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
      },
      {
        id: 1, name: 'TestBook3', description: 'Description3', author: 'Author2',
        publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3, image: 'src/test'
      }
    ];
    component.books$ = of(books);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const firstElementImg: Element = compiled.querySelector('.books-list__item:first-child a');

    expect(firstElementImg.getAttribute('href')).toContain('/books/0');

    const lastElementImg: Element = compiled.querySelector('.books-list__item:last-child a');

    expect(lastElementImg.getAttribute('href')).toContain('/books/1');
  });
});
