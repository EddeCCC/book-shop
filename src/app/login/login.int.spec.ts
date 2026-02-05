import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideTranslateService } from '@ngx-translate/core';

describe('Login Integration', () => {
    let component: Login;
    let fixture: ComponentFixture<Login>;
    let loginService: LoginService;
    const formData = {
        firstName: 'Eddy',
        lastName: 'Smith',
        email: 'eddy@example.com',
        birthday: '2000-01-01'
    };

    beforeEach(async () => {
        const routerSpy = { navigate: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [Login, ReactiveFormsModule],
            providers: [
                provideTranslateService(),
                LoginService,
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(Login);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService);

        await fixture.whenStable();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
        expect(loginService).toBeTruthy();
    });

    it('should set loginService signals', () => {
        component.loginForm.setValue(formData);

        component.submitLogin();

        expect(loginService.username()).toBe('Eddy Smith');
        expect(loginService.email()).toBe('eddy@example.com');
        expect(loginService.isLoggedIn()).toBe(true);
    });
});
