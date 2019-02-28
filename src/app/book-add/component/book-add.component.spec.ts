import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddComponent } from './book-add.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBooksListService } from 'src/app/common/IBooksListService';
import { BooksListService } from 'src/app/books-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';

describe('BookAddComponent', () => {
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  let service: IBooksListService;
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddComponent ],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        FileUploadModule,
        RouterTestingModule.withRoutes([
          {
            path: 'books',
            children: []
          }
        ])
      ],
      providers: [
        {
          provide: IBooksListService, useClass: BooksListService
        },
        { provide: Router, useValue: mockRouter},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddComponent);
    service = TestBed.get(IBooksListService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickSave testing', () => {
    it('expect call add book onClickSave', () => {
      const spyAddBook = spyOn(service, 'addBook');
      const form = {
        valid: true,
        form: {
          value: { author: 'Test', code: 'Code', description: 'Description',
            name: 'Name', pageCount: 1, publishYear: 2001, publisher: 'TestPub'
          }
        }
      };
      component.onClickSave(form as NgForm);

      expect(spyAddBook).toHaveBeenCalled();
    });

    it('expect not save with invalid year', () => {
      const spyAddBook = spyOn(service, 'addBook');
      const form = {
        valid: true,
        form: {
          value: { author: 'Test', code: 'Code', description: 'Description',
            name: 'Name', pageCount: 1, publishYear: 0, publisher: 'TestPub'
          }
        }
      };
      component.onClickSave(form as NgForm);
      expect(component.isInvalidYear).toBeTruthy();
      expect(spyAddBook).not.toHaveBeenCalled();
    });

    it('extect after save navigate to main page', () => {
      const form = {
        valid: true,
        form: {
          value: { author: 'Test', code: 'Code', description: 'Description',
            name: 'Name', pageCount: 1, publishYear: 0, publisher: 'TestPub'
          }
        }
      };
      component.onClickSave(form as NgForm);
      expect (mockRouter.navigateByUrl).toHaveBeenCalledWith('/books');
    });
  });

});
