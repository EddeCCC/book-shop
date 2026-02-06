import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkout } from './checkout';
import { OrderService } from '../orders/orders.service';
import { LoginService } from '../login/login.service';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../app.routes';
import { User } from '../models/user';
import { BookOrder } from '../models/order';

describe('Checkout Integration', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;
  let loginService: LoginService;
  let orderService: OrderService;
  let router: Router;
  const shippingData = {
    address: 'street',
    city: 'Berlin'
  };
  const user: User = {
    username: 'Eddy',
    email: 'eddy@example.com',
  };
  const bookOrder: BookOrder = {
    bookId: '1',
    title: 'Title',
    price: 10
  };


  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Checkout],
        providers: [
          provideTranslateService(),
          provideRouter(routes),
          LoginService,
          OrderService
        ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(Checkout);
      component = fixture.componentInstance;
      loginService = TestBed.inject(LoginService);
      orderService = TestBed.inject(OrderService);
      router = TestBed.inject(Router);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set current order location', () => {
      component.shippingForm.setValue(shippingData);

      component.submitShipping();

      expect(orderService.currentOrderLocation()).toEqual(shippingData);
    });

    it('should add order after finish checkout', () => {
      orderService.setBookOrder(bookOrder.bookId, bookOrder.title, bookOrder.price);
      loginService.login(user);
      component.shippingForm.setValue(shippingData);
      component.submitShipping();

      component.finishCheckout();

      expect(orderService.orders().length).toEqual(1);
      expect(orderService.orders()[0].bookOrder).toEqual(bookOrder);
      expect(orderService.orders()[0].location).toEqual(shippingData);
    });
});
