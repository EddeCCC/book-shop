import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../books/books.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from '../models/book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatChip,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails {
  route: ActivatedRoute = inject(ActivatedRoute);
  bookService = inject(BookService);

  bookId = this.route.snapshot.params['id'];

  book = toSignal<Book | undefined>(this.bookService.getBookById(this.bookId), { initialValue: undefined });
}
