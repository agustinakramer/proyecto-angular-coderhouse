import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';
import { User } from './model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = `${API_URL}/users`;
  user: User | null = null;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): void {
    this.httpClient.get<User[]>(this.usersUrl).subscribe((users) => {
      const user = users.find(u => u.email === email);
      if(!user)
        { throw new Error('User not found'); }
    if(user.password !== password) {
        throw new Error('Invalid password');
      }
    localStorage.setItem('token', user.email);
    this.user = user;
    this.router.navigate(['dashboard']);

  });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
