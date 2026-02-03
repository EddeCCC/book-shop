import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    // Source of truth
    private _username = signal<string | null>(null);
    private _email = signal<string | null>(null);

    username = computed(() => this._username());
    email = computed(() => this._email());
    isLoggedIn = computed(() => !!this._username());

    login(user: User) {
        this._username.set(user.username);
        this._email.set(user.email);
    }

    logout() {
        this._username.set(null);
        this._email.set(null);
    }
}
