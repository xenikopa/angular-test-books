import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemComponent } from './book-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { IBooksListService } from 'src/app/common/IBooksListService';
import { BooksListService } from 'src/app/books-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import { IBook } from 'src/app/common/IBook';

describe('BookItemComponent', () => {
  let component: BookItemComponent;
  let fixture: ComponentFixture<BookItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
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
    fixture = TestBed.createComponent(BookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('expect onClickEdit set edit mode', () => {
    component.onClickEdit();
    fixture.detectChanges();

    expect(component.isReadState).toBeFalsy();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button[type=submit]').textContent).toContain('Сохранить изменения');
    expect(compiled.querySelector('button[type=button]')).toBeDefined();

    const formInputs: HTMLFormElement = compiled.querySelector('form');
    expect(formInputs.elements.length).toEqual(8);

    for (let i = 0; i < formInputs.length; i++) {
      expect(formInputs[i].getAttribute('disabled')).toBeFalsy();
    }
  });

  it('expect onClickCancel set read mode', () => {
    component.onClickCancel();
    fixture.detectChanges();

    expect(component.isReadState).toBeTruthy();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button[type=submit]')).toBeNull();
    expect(compiled.querySelector('button[type=button]').textContent).toContain('Редактировать книгу');

    const formInputs: HTMLFormElement = compiled.querySelector('form');
    expect(formInputs.elements.length).toEqual(7);

    for (let i = 0; i < formInputs.length; i++) {
      expect(formInputs[i].getAttribute('ng-reflect-is-disabled')).toBeTruthy();
    }
  });

  it('expect when no img set default picture', () => {
    const book: IBook = {
      id: 0, name: 'TestBook3', description: 'Description3', author: 'Author2',
      publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
    };
    component.bookItem$ = of(book);

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const img: Element = compiled.querySelector('img');

    expect(img.getAttribute('src')).toContain('/assets/common/img/noImg.png');
  });
});
