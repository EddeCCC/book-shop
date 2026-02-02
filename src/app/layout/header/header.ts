import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private loginService = inject(LoginService);

  isLoggedIn = computed(() => this.loginService.isLoggedIn());
  username = computed(() => this.loginService.username());

  logout() {
    this.loginService.logout();
  }
}
