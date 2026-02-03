import { Component, inject, Input } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private loginService = inject(LoginService);
  private router = inject(Router);

  @Input() redirectAfterLogin = true;

  loginForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('') 
  });

  submitLogin() {
    const user: User = {
      username: this.loginForm.value.firstName + ' ' + this.loginForm.value.lastName,
      email: this.loginForm.value.email!
    }

    this.loginService.login(user);

    if (this.redirectAfterLogin) this.router.navigate(["/"]);
  }
}
