import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let loginService: LoginService;
  let router: Router;
  let translate: TranslateService;

  beforeEach(async () => {
    const loginSpy = { logout: vi.fn(), isLoggedIn: vi.fn(), username: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideTranslateService(),
        provideRouter(routes),
        { provide: LoginService, useValue: loginSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    translate = TestBed.inject(TranslateService);

    vi.spyOn(router, 'navigate');
    vi.spyOn(translate, 'use');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login data', () => {
    component.isLoggedIn();
    component.username();

    expect(loginService.isLoggedIn).toHaveBeenCalled();
    expect(loginService.username).toHaveBeenCalled();
  });

  it('should logout and navigate to home', () => {
    component.logout();

    expect(loginService.logout).toHaveBeenCalledOnce();
    expect(router.navigate).toHaveBeenCalledOnce();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should change language', () => {
    component.changeLanguage('de');

    expect(translate.use).toHaveBeenCalledOnce();
    expect(translate.use).toHaveBeenCalledWith('de');
  });
});
