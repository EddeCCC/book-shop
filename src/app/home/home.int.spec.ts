import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { LoginService } from '../login/login.service';

describe('Home Int', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let loginService: LoginService;
  const username = "Eddy";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideTranslateService(),
        provideRouter(routes),
        LoginService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login', () => {
    loginService.login({username: username, email: ''});

    expect(component.isLoggedIn()).toBeTruthy();
    expect(component.username()).toEqual(username);
  });
});
