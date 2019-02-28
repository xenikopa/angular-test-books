import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksListService } from './books-list.service';
import { IBook } from './common/IBook';
import { IBooksListService } from './common/IBooksListService';

describe('BooksListService', () => {
  const bookUrl =
    'assets/common/books.json';
  let service: BooksListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BooksListService
      ]
    });

    service = TestBed.get(BooksListService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();

    const responce: {books: Array<IBook>} = {books: []};
    const req = httpMock.expectOne(request => request.url === bookUrl);
    expect(req.request.method).toBe('GET');
    req.flush(responce);
  });

  describe('getAllBooks testing', () => {
    it('expect get correct all books', () => {
      const result: Array<IBook> = [
        {
          id: 1, name: 'TestBook', description: 'Description', author: 'Author',
          publisher: 'Publisher', code: '123', publishYear: 2012, rate: 0,
          image: 'src/test'
        },
        {
          id: 2, name: 'TestBook2', description: 'Description2', author: 'Author2',
          publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
          image: 'src/test2'
        }
      ];

      const responce: {books: Array<IBook>} = {books: [
        {
          id: 1, name: 'TestBook', description: 'Description', author: 'Author',
          publisher: 'Publisher', code: '123', publishYear: 2012, rate: 0,
          image: 'src/test'
        },
        {
          id: 2, name: 'TestBook2', description: 'Description2', author: 'Author2',
          publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
          image: 'src/test2'
        }
      ]};

      service.getAllBooks().subscribe(x => {
        expect(x).toEqual(result);
      });
      const req = httpMock.expectOne(request => request.url === bookUrl);
      expect(req.request.method).toBe('GET');
      req.flush(responce);
    });

    it('expect get correct all books after error', () => {
      const result: Array<IBook> = [];

      service.getAllBooks().subscribe(x => {
        expect(x).toEqual(result);
      });
      const req = httpMock.expectOne(request => request.url === bookUrl);
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 500, statusText: 'Error'});
    });
  });

  describe('getBookById testing', () => {
    it('expect get correct book by id', () => {
      const result: IBook = {
          id: 2, name: 'TestBook2', description: 'Description2', author: 'Author2',
          publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
          image: 'src/test2'
        };

      const responce: {books: Array<IBook>} = {books: [
        {
          id: 1, name: 'TestBook', description: 'Description', author: 'Author',
          publisher: 'Publisher', code: '123', publishYear: 2012, rate: 0,
          image: 'src/test'
        },
        {
          id: 2, name: 'TestBook2', description: 'Description2', author: 'Author2',
          publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
          image: 'src/test2'
        }
      ]};

      service.getBookById(2).subscribe(x => {
        expect(x).toEqual(result);
      });

      const req = httpMock.expectOne(request => request.url === bookUrl);
      expect(req.request.method).toBe('GET');
      req.flush(responce);
    });

    it('expect null when find no book', () => {

      const responce: {books: Array<IBook>} = {books: [
        {
          id: 1, name: 'TestBook', description: 'Description', author: 'Author',
          publisher: 'Publisher', code: '123', publishYear: 2012, rate: 0,
          image: 'src/test'
        },
        {
          id: 2, name: 'TestBook2', description: 'Description2', author: 'Author2',
          publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
          image: 'src/test2'
        }
      ]};

      service.getBookById(98).subscribe(x => {
        expect(x).toBeNull();
      });

      const req = httpMock.expectOne(request => request.url === bookUrl);
      expect(req.request.method).toBe('GET');
      req.flush(responce);
    });

    it('expect null when invalid id', () => {
      const responce: {books: Array<IBook>} = {books: [
        {
          id: 1, name: 'TestBook', description: 'Description', author: 'Author',
          publisher: 'Publisher', code: '123', publishYear: 2012, rate: 0,
          image: 'src/test'
        },
        {
          id: 2, name: 'TestBook2', description: 'Description2', author: 'Author2',
          publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
          image: 'src/test2'
        }
      ]};

      service.getBookById(null).subscribe(x => {
        expect(x).toBeNull();
      });

      const req = httpMock.expectOne(request => request.url === bookUrl);
      expect(req.request.method).toBe('GET');
      req.flush(responce);
    });
  });

  describe('addBook testing', () => {
    it('expect cerrect add book', () => {
      const responce: {books: Array<IBook>} = {books: []};
      const req = httpMock.expectOne(request => request.url === bookUrl);
      expect(req.request.method).toBe('GET');
      req.flush(responce);

      const book: IBook = {
        id: 0, name: 'TestBook3', description: 'Description3', author: 'Author2',
        publisher: 'Publisher2', code: '321', publishYear: 2000, rate: 3,
        image: 'src/test1'
      };
      service.addBook(book);

      service.getAllBooks().subscribe(x => {
        const lastItem = x.pop();
        expect(lastItem).toEqual(book);
      });
    });
  });

});
