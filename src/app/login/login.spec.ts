import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideTranslateLoader, provideTranslateService, TranslateLoader, TranslatePipe, TranslateService } from '@ngx-translate/core';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let loginService: LoginService;
  let router: Router;
  const formData = {
    firstName: 'Eddy',
    lastName: 'Smith',
    email: 'eddy@example.com',
    birthday: '2000-01-01'
  }

  beforeEach(async () => {
    const loginSpy = { login: vi.fn() }
    const routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule],
      declarations: [],
      providers: [
        provideTranslateService(),
        { provide: LoginService, useValue: loginSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call login() and emit loginSuccess() on submit', () => {
    component.loginForm.setValue(formData);

    component.submitLogin();

    expect(loginService.login).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  });

  it('should not navigate if redirectAfterLogin is false', () => {
    component.redirectAfterLogin = false;
    component.loginForm.setValue(formData);

    component.submitLogin();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
