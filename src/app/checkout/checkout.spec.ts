import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkout } from './checkout';
import { OrderService } from '../orders/orders.service';
import { LoginService } from '../login/login.service';
import { provideTranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BookOrder } from '../models/order';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;
  let loginService: LoginService;
  let orderService: OrderService;
  let router: Router;
  let loginSpy: any;
  let orderSpy: any;
  let routerSpy: any;
  const shippingData = {
    address: 'street',
    city: 'Berlin'
  };
  const bookOrder: BookOrder = {
    bookId: '1',
    title: 'Title',
    price: 10
  };

  beforeEach(async () => {
    loginSpy = {
      username: vi.fn(() => 'Eddy'),
      email: vi.fn(() => 'eddy@example.com'),
      isLoggedIn: vi.fn(() => true),
    };
    orderSpy = {
      currentBookOrder: vi.fn(),
      currentOrderLocation: vi.fn(),
      setOrderLocation: vi.fn(),
      finishOrder: vi.fn()
    };
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: [
        provideTranslateService(),
        { provide: LoginService, useValue: loginSpy },
        { provide: OrderService, useValue: orderSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  // Helper function to set mock return values before creating component
  function createComponent() {
    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;

    loginService = TestBed.inject(LoginService);
    orderService = TestBed.inject(OrderService);
    router = TestBed.inject(Router);

    fixture.detectChanges(); // triggers ngOnInit & bindings
  }

  it('should create', () => {
    createComponent();

    expect(component).toBeTruthy();
  });

  it('should redirect when no book order on init', () => {
    orderSpy.currentBookOrder.mockReturnValue(null);

    createComponent();

    expect(orderService.currentBookOrder).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/books']);
  });

  it('should not redirect if book order exists', () => {
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);

    createComponent();

    expect(orderService.currentBookOrder).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should be invalid checkout without book order', () => {
    orderSpy.currentBookOrder.mockReturnValue(null);
    orderSpy.currentOrderLocation.mockReturnValue(shippingData);
    loginSpy.isLoggedIn.mockReturnValue(true);

    createComponent();

    expect(component.isInvalid()).toBe(true);
  });

  it('should be invalid checkout without order location', () => {
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);
    orderSpy.currentOrderLocation.mockReturnValue(null);
    loginSpy.isLoggedIn.mockReturnValue(true);
    
    createComponent();

    expect(component.isInvalid()).toBe(true);
  });

  it('should be invalid checkout without login', () => {
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);
    orderSpy.currentOrderLocation.mockReturnValue(shippingData);
    loginSpy.isLoggedIn.mockReturnValue(false);
    
    createComponent();

    expect(component.isInvalid()).toBe(true);
  });

  it('should be valid checkout', () => {
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);
    orderSpy.currentOrderLocation.mockReturnValue(shippingData);
    loginSpy.isLoggedIn.mockReturnValue(true);
    
    createComponent();

    expect(component.isInvalid()).toBe(false);
  });

  it('should finish checkout and navigate', () => {
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);
    orderSpy.currentOrderLocation.mockReturnValue(shippingData);

    createComponent();

    component.finishCheckout();

    expect(orderService.finishOrder).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/orders']);
  });

  it('should display continue button for login when logged in', () => {
    loginSpy.isLoggedIn.mockReturnValue(true);
    
    createComponent();

    const continueLoginButton = fixture.debugElement.query(By.css('.login-continue-button'));
    const buttonExists = !!continueLoginButton;

    expect(buttonExists).toBeTruthy();
  });

  it('should not display continue button for login when logged out', () => {
    loginSpy.isLoggedIn.mockReturnValue(false);

    createComponent();

    const continueLoginButton = fixture.debugElement.query(By.css('.login-continue-button'));
    const buttonExists = !!continueLoginButton;

    expect(buttonExists).toBeFalsy();
  });

  it('should enable continue button for shipping when form valid', () => {    
    createComponent();

    component.shippingForm.setValue(shippingData);
    fixture.detectChanges();

    const continueButton = fixture.debugElement.query(By.css('.shipping-continue-button'));
    const buttonDisabled = continueButton.nativeElement.disabled;

    expect(buttonDisabled).toBeFalsy();
  });

  it('should disable continue button for shipping when form invalid', () => {
    createComponent();

    const continueButton = fixture.debugElement.query(By.css('.shipping-continue-button'));
    const buttonDisabled = continueButton.nativeElement.disabled;

    expect(buttonDisabled).toBeTruthy();
  });

  it('should enable finish button when checkout valid', () => {    
    loginSpy.isLoggedIn.mockReturnValue(true);
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);
    orderSpy.currentOrderLocation.mockReturnValue(shippingData);
    createComponent();

    const finishButton = fixture.debugElement.query(By.css('.finish-button'));
    const buttonDisabled = finishButton.nativeElement.disabled;

    expect(buttonDisabled).toBeFalsy();
  });

  it('should disable finish button when shipping data missing', () => {
    loginSpy.isLoggedIn.mockReturnValue(false);
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);
    createComponent();

    const finishButton = fixture.debugElement.query(By.css('.finish-button'));
    const buttonDisabled = finishButton.nativeElement.disabled;

    expect(buttonDisabled).toBeTruthy();
  });

  it('should disable finish button when logged out', () => {
    loginSpy.isLoggedIn.mockReturnValue(false);
    orderSpy.currentBookOrder.mockReturnValue(bookOrder);
    orderSpy.currentOrderLocation.mockReturnValue(shippingData);
    createComponent();

    const finishButton = fixture.debugElement.query(By.css('.finish-button'));
    const buttonDisabled = finishButton.nativeElement.disabled;

    expect(buttonDisabled).toBeTruthy();
  });

  it('should disable finish button when book order missing', () => {
    loginSpy.isLoggedIn.mockReturnValue(true);
    orderSpy.currentOrderLocation.mockReturnValue(shippingData);
    createComponent();

    const finishButton = fixture.debugElement.query(By.css('.finish-button'));
    const buttonDisabled = finishButton.nativeElement.disabled;

    expect(buttonDisabled).toBeTruthy();
  });
});
