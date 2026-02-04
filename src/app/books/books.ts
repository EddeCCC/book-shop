import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookService } from './books.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Book } from '../models/book';
import { OrderService } from '../orders/order.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-books',
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatFormField, 
    MatSelect, 
    MatLabel, 
    MatOption, 
    RouterLink, 
    CurrencyPipe,
    TranslatePipe
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books {
  private bookService = inject(BookService);
  private orderService = inject(OrderService);
  private ALL = 'All';

  private books$ = this.bookService.getBooks();
  books = toSignal<Book[]>(this.books$, { initialValue: undefined});

  allCategories = computed(() => this.getCategories(this.books()));
  selectedCategories = signal<string[]>([this.ALL]);

  filteredBooks = computed(() => this.getSelectedBooks(this.books(), this.selectedCategories()));
  filteredCount = computed(() => this.filteredBooks().length);

  getCategories(books: Book[] | undefined): string[] {
    if(!books) return [];

    // Use set to prevent duplicate categories
    const set = new Set<string>();
    books.forEach(book => 
      book.categories.forEach(c => set.add(c))
    );
    return Array.from(set).sort();
  }

  getSelectedBooks(books: Book[] | undefined, selected: string[]): Book[] {
    if(!books) return [];

    if(selected.includes(this.ALL))return books;

    return books.filter(book => 
      book.categories.some(category => selected.includes(category))
    );
  }

  onCategorySelectionChange(values: string[]) {
    if (values.includes('ALL')) {
      this.selectedCategories.set(['ALL']);
    } else {
      this.selectedCategories.set(values);
    }
  }

  onBuy(book: Book) {
    this.orderService.setBookOrder(book.id, book.title, book.price);
  }
}
