import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { LoginService } from '../../login/login.service';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('Header Integration', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let loginService: LoginService;
  let translate: TranslateService;
  const username = "Eddy";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideTranslateService(),
        provideRouter(routes),
        LoginService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    translate = TestBed.inject(TranslateService);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login data', () => {
    loginService.login({username: username, email: ''});

    expect(component.isLoggedIn()).toBeTruthy();
    expect(component.username()).toEqual(username);
  });

  it('should logout', () => {
    loginService.login({username: username, email: ''});

    component.logout();

    expect(loginService.isLoggedIn()).toBeFalsy();
    expect(loginService.username()).toBeNull();
  });

  it('should change language', () => {
    const lang = 'de';
    component.changeLanguage(lang);

    expect(translate.getCurrentLang()).toEqual(lang);
  });
});
