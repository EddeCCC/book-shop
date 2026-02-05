import { TestBed } from '@angular/core/testing';
import { OrderService } from './orders.service';
import { BookOrder, OrderLocation, Order } from '../models/order';

describe('OrderService', () => {
    let service: OrderService;
    const book: BookOrder = { bookId: 'b1', title: 'Title', price: 25 };
    const location: OrderLocation = { address: 'street', city: 'Berlin' };

    beforeEach(() => {
        service = TestBed.inject(OrderService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should initially have no current signals or orders', () => {
        expect(service.currentBookOrder()).toBeNull();
        expect(service.currentOrderLocation()).toBeNull();
        expect(service.orders()).toEqual([]);
    });

    it('should set book order', () => {
        service.setBookOrder(book.bookId, book.title, book.price);
        expect(service.currentBookOrder()).toEqual(book);
    });

    it('should set order location', () => {
        service.setOrderLocation(location.address, location.city);
        expect(service.currentOrderLocation()).toEqual(location);
    });

    it('should add order and reset current signals', () => {
        service.setBookOrder(book.bookId, book.title, book.price);
        service.setOrderLocation(location.address, location.city);

        service.finishOrder();

        const orders = service.orders();
        expect(orders[0]).toEqual({
            id: 0,
            bookOrder: book,
            location: location
        });

        expect(service.currentBookOrder()).toBeNull();
        expect(service.currentOrderLocation()).toBeNull();
    });

    it('should not add order with unset signal', () => {
        service.finishOrder();

        expect(service.orders().length).toEqual(0);
    });

    it('should increment order ID', () => {
        service.setBookOrder(book.bookId, book.title, book.price);
        service.setOrderLocation(location.address, location.city);
        service.finishOrder();

        service.setBookOrder(book.bookId, book.title, book.price);
        service.setOrderLocation(location.address, location.city);
        service.finishOrder();

        const orders = service.orders();
        expect(orders.length).toBe(2);

        expect(orders[0].id).toBe(0);
        expect(orders[1].id).toBe(1);
    });
});
