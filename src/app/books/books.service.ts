import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  private jsonUrl = "http://localhost:3000/books";

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.jsonUrl)
      .pipe(map((data) => data
            .filter((entry) => this.validateEntry(entry))
            .map((entry) => this.mapToBook(entry))
        )
    );
  }

  getBookById(id: number): Observable<Book | undefined> {
      const params = new HttpParams().set('id', id);
      return this.http.get<Book[]>(this.jsonUrl, {params})
        .pipe(map((data) => {
          const book = data[0];
          if(this.validateEntry(book)) 
            return this.mapToBook(book);
          return undefined;
        }));
  }

  private mapToBook(entry: any): Book {
    return {
      id: entry.id,
      title: entry.volumeInfo.title,
      subtitle: entry.volumeInfo.subtitle ?? '',
      authors: entry.volumeInfo.authors ?? [],
      publishedDate: entry.volumeInfo.publishedDate ?? '',
      description: entry.volumeInfo.description ?? '',
      categories: entry.volumeInfo.categories,
      price: entry.saleInfo.retailPrice.amount
    };
  }

  private validateEntry(entry: any): boolean {
    const valid = entry?.id && 
      entry?.volumeInfo?.title && 
      entry?.volumeInfo?.categories &&
      entry?.saleInfo?.retailPrice?.amount
    
    if (!valid) console.warn("Invalid data");

    return valid;
  }
}
