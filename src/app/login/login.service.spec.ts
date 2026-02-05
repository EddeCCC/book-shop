import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { User } from '../models/user';

describe('LoginService', () => {
    let service: LoginService;
    const user: User = { username: 'eddy', email: 'eddy@example.com' };

    beforeEach(() => {
        service = TestBed.inject(LoginService);
    });
    
    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should initially be logged out', () => {
        expect(service.isLoggedIn()).toBeFalsy();
        expect(service.username()).toBeNull();
        expect(service.email()).toBeNull();
    });

    it('should login a user', () => {
        service.login(user);

        expect(service.isLoggedIn()).toBeTruthy();
        expect(service.username()).toBe('eddy');
        expect(service.email()).toBe('eddy@example.com');
  });

  it('should logout a user', () => {
      service.login(user);  
      service.logout();    

      expect(service.isLoggedIn()).toBeFalsy();
      expect(service.username()).toBeNull();
      expect(service.email()).toBeNull();
  });
});
