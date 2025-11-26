import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Rootstate } from '../../../../core/store';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../core/store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
user$: Observable<any>;
constructor(private authService: AuthService, private router: Router, private store: Store<Rootstate>) {
  this.user$ = this.store.select(selectAuthUser);
}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
