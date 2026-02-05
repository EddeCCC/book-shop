import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Orders } from './orders';
import { provideTranslateService } from '@ngx-translate/core';
import { OrderService } from './orders.service';

describe('Orders Integration', () => {
  let component: Orders;
  let fixture: ComponentFixture<Orders>;
  let orderService: OrderService;
  const orders = [
    { id: 0, bookOrder: { bookId: 'b1', title: 'Book One', price: 25 }, location: { address: '123 Main', city: 'Berlin' } },
    { id: 1, bookOrder: { bookId: 'b2', title: 'Book Two', price: 30 }, location: { address: '456 Elm', city: 'Frankfurt' } }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orders],
      providers: [
        provideTranslateService(),
        OrderService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orders);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute finishedOrders from service', () => {
    orderService.orders.set(orders);

    expect(component.finishedOrders()).toEqual(orders);
  });
});
