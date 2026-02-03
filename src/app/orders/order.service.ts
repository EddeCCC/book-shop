import { Injectable, signal } from '@angular/core';
import { BookOrder, Order, OrderLocation } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  currentBookOrder = signal<BookOrder | null>(null);
  currentOrderLocation = signal<OrderLocation | null>(null);
  private currentOrderId = 0;

  orders = signal<Order[]>([]);

  setBookOrder(bookId: string, title: string) {
    this.currentBookOrder.set({
      bookId: bookId,
      title: title
    });
  }

  setOrderLocation(address: string, city: string) {
    this.currentOrderLocation.set({
      address: address,
      city: city,
    });
  }

  finishOrder() {
    const order: Order = {
      id: this.currentOrderId,
      bookOrder: this.currentBookOrder()!,
      location: this.currentOrderLocation()!
    };
    
    this.orders.set([...this.orders(), order]);
    this.currentOrderId++;
    this.currentBookOrder.set(null);
    this.currentOrderLocation.set(null);
  }
}
