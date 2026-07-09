import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClimateListComponent } from './components/climate-list/climate-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClimateListComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private authService = inject(AuthService);

  protected readonly title = signal('frontend-angular');

  isAuthenticated = this.authService.isLoggedIn();

  onLogin(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}