import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BookService } from './books.service';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Book } from '../models/book';

describe('BookService', () => {
    let service: BookService;
    let httpTesting: HttpTestingController;

    const jsonUrl = "http://localhost:3000/books";

    const mappedBooks: Book[] = [{
      id: '42',
      title: 'Clean Code',
      subtitle: 'A Handbook of Agile Software Craftsmanship',
      authors: ['Robert C. Martin'],
      publishedDate: '2008',
      description: 'A book about writing clean code',
      categories: ['Programming'],
      price: 39.99
    }]

    const rawValidBooks = [{
      id: '42',
      volumeInfo: {
        title: 'Clean Code',
        subtitle: 'A Handbook of Agile Software Craftsmanship',
        authors: ['Robert C. Martin'],
        publishedDate: '2008',
        description: 'A book about writing clean code',
        categories: ['Programming']
      },
      saleInfo: {
        retailPrice: {amount: 39.99}
      }
    }];

    const rawInvalidBooks = [{
      id: '24',
      volumeInfo: {
        title: 'Invalid Book'
      }
    }];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          BookService,
          provideHttpClient(),
          provideHttpClientTesting()
        ]
      });

      service = TestBed.inject(BookService);
      httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTesting.verify();
    });
    
    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should return books when valid', async () => {
      const books$ = service.getBooks();
      const booksPromise = firstValueFrom(books$);

      const req = httpTesting.expectOne(jsonUrl, 'Request to load all books');
      expect(req.request.method).toBe('GET');

      req.flush(rawValidBooks);
      expect(await booksPromise).toEqual(mappedBooks);
    });

    it('should return empty when invalid', async () => {
      const books$ = service.getBooks();
      const booksPromise = firstValueFrom(books$);

      const req = httpTesting.expectOne(jsonUrl, 'Request to load all books');
      expect(req.request.method).toBe('GET');

      req.flush(rawInvalidBooks);
      expect(await booksPromise).toEqual([]);
    });

    it('should return single book when valid', async () => {
      const books$ = service.getBookById(42);
      const booksPromise = firstValueFrom(books$);

      const fullUrl = jsonUrl + '?id=42';
      const req = httpTesting.expectOne(fullUrl, 'Request to load one book');
      expect(req.request.method).toBe('GET');

      req.flush(rawValidBooks);
      expect(await booksPromise).toEqual(mappedBooks[0]);
    });

    it('should return undefined when invalid', async () => {
      const books$ = service.getBookById(24);
      const booksPromise = firstValueFrom(books$);

      const fullUrl = jsonUrl + '?id=24';
      const req = httpTesting.expectOne(fullUrl, 'Request to load one book');
      expect(req.request.method).toBe('GET');

      req.flush(rawInvalidBooks);
      expect(await booksPromise).toBeUndefined();
    });

    it('should return undefined when not found', async () => {
      const books$ = service.getBookById(1);
      const booksPromise = firstValueFrom(books$);

      const fullUrl = jsonUrl + '?id=1';
      const req = httpTesting.expectOne(fullUrl, 'Request to load one book');
      expect(req.request.method).toBe('GET');

      req.flush([]);
      expect(await booksPromise).toBeUndefined();
    });
});
