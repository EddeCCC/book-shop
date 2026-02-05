import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideTranslateService } from '@ngx-translate/core';

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

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form invalid when firstName invalid', () => {
    component.loginForm.setValue({ ...formData, firstName: 'A' });

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form invalid when lastName invalid', () => {
    component.loginForm.setValue({ ...formData, lastName: 'A' });

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form invalid when email invalid', () => {
    component.loginForm.setValue({ ...formData, email: 'A' });

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form valid with valid data', () => {
    component.loginForm.setValue(formData);

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call login()', () => {
    component.loginForm.setValue(formData);

    component.submitLogin();

    expect(loginService.login).toHaveBeenCalledOnce();
  });

  it('should not call login() when form invalid', () => {
    component.submitLogin();

    expect(loginService.login).not.toHaveBeenCalled();
  });

  it('should emit loginSuccess()', () =>  {
    const emitSpy = vi.spyOn(component.loginSuccess, 'emit');

    component.loginForm.setValue(formData);
    component.submitLogin();

    expect(emitSpy).toHaveBeenCalledOnce();
  });

  it('should navigate after login', () => {
    component.loginForm.setValue(formData);

    component.submitLogin();

    expect(router.navigate).toHaveBeenCalledOnce();
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  });

  it('should not navigate after login', () => {
    component.redirectAfterLogin = false;
    component.loginForm.setValue(formData);

    component.submitLogin();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
