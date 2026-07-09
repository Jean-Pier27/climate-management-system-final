import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);

  @Output() loggedIn = new EventEmitter<void>();

  email = '';
  password = '';
  errorMessage = '';

  async login(): Promise<void> {
    const success = await this.authService.login(this.email, this.password);

    if (success) {
      this.errorMessage = '';
      this.loggedIn.emit();
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}