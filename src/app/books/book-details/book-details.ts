import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../books.service';
import { Book } from '../../models/book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { OrderService } from '../../orders/order.service';

@Component({
  selector: 'app-book-details',
  imports: [
    CommonModule,
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
  orderService = inject(OrderService);

  bookId = this.route.snapshot.params['id'];

  //book = toSignal<Book | undefined>(this.bookService.getBookById(this.bookId), { initialValue: undefined });
  book$ = this.bookService.getBookById(this.bookId);

  onBuy(book: Book) {
    this.orderService.setBookOrder(book.id, book.title, book.price);
  }
}
