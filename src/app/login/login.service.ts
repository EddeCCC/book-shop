import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    // Source of truth
    private _username = signal<string | null>(null);

    username = computed(() => this._username())
    isLoggedIn = computed(() => !!this._username());

    login(username: string) {
        this._username.set(username);
    }

    logout() {
        this._username.set(null);
    }
}
