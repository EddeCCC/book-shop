import { Component, computed, inject, ViewChild } from '@angular/core';
import { LoginService } from '../login/login.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../orders/order.service';

@Component({
  selector: 'app-checkout',
  imports: [
    MatStepperModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    ReactiveFormsModule,
    Login
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private loginService = inject(LoginService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  @ViewChild(MatStepper) private stepper!: MatStepper;

  username = computed(() => this.loginService.username());
  email = computed(() => this.loginService.email());
  isLoggedIn = computed(() => this.loginService.isLoggedIn());
  bookTitle = computed(() => this.orderService.currentBookOrder()?.title);
  isInvalid = computed(() => this.isCheckoutInvalid());

  // Check if we need horizontal or vertical stepper
  isMobile = window.innerWidth <= 768;

  shippingForm = this.formBuilder.group({
    address: ['', Validators.required],
    city: ['', Validators.required],
  });

  ngOnInit() {
    if (!this.orderService.currentBookOrder()) {
      this.router.navigate(['/books']);
    }

    if (this.isLoggedIn()) {
      Promise.resolve().then(() => {
          this.stepper.next();
      });
    }
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
