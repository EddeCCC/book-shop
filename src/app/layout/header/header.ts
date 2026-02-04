import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule, MatMenuModule, MatIconModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  isLoggedIn = computed(() => this.loginService.isLoggedIn());
  username = computed(() => this.loginService.username());

  logout() {
    this.loginService.logout();
    
    this.router.navigate(["/"]);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
