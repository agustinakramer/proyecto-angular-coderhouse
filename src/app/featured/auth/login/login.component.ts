import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['admin@example.com', [Validators.required]],
      password: ['admin123', [Validators.required]]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      alert('Formulario inválido. Por favor, verifica los campos.');
      return;
    }

    try {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }

  }
}
