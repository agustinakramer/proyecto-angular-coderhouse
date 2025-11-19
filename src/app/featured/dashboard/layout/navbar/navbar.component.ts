import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
