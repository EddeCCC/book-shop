import { Component, computed, inject, ViewChild, OnInit, AfterViewInit, signal } from '@angular/core';
import { LoginService } from '../login/login.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../orders/orders.service';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkout',
  imports: [
    MatStepperModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    ReactiveFormsModule,
    CurrencyPipe,
    TranslatePipe,
    Login
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit, AfterViewInit {
  private loginService = inject(LoginService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild(MatStepper) private stepper!: MatStepper;

  username = computed(() => this.loginService.username());
  email = computed(() => this.loginService.email());
  isLoggedIn = computed(() => this.loginService.isLoggedIn());
  bookTitle = computed(() => this.orderService.currentBookOrder()?.title);
  bookPrice = computed(() => this.orderService.currentBookOrder()?.price);
  isInvalid = computed(() => this.isCheckoutInvalid());

  // Check if we need horizontal or vertical stepper
  //isMobile = window.innerWidth <= 768;
  isMobile = signal(false);

  shippingForm = this.formBuilder.group({
    address: ['', Validators.required],
    city: ['', Validators.required],
  });

  constructor() {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  ngOnInit() {
    if (!this.orderService.currentBookOrder()) {
      this.router.navigate(['/books']);
    }
  }

  ngAfterViewInit() {
    if (this.isLoggedIn()) {
      this.onLoginSuccess();
    }
  }

  onLoginSuccess() {
    setTimeout(() => {
      this.stepper.selectedIndex = 1;
    });
}

  submitShipping() {
      this.orderService.setOrderLocation(this.shippingForm.value.address!, this.shippingForm.value.city!);
  }

  isCheckoutInvalid(): boolean {
    return !this.orderService.currentBookOrder() || 
        !this.orderService.currentOrderLocation() ||
        !this.isLoggedIn();
  }

  finishCheckout() {
    this.orderService.finishOrder();
    this.router.navigate(['/orders']);
  }
}
