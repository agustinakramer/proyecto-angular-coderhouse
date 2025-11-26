import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';
import { User } from './model/User';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Rootstate } from '../../store';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../store/auth/auth.selector';
import { setAuthUser } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = `${API_URL}/users`;
  user$: Observable<any>;

  constructor(private httpClient: HttpClient, private router: Router, private store: Store<Rootstate>) {
    this.user$ = this.store.select(selectAuthUser);

    const token = localStorage.getItem('token');
    if (token) {
      const [email, password] = token.split('&');
      this.login(email, password).subscribe(user => {
        this.store.dispatch(setAuthUser({ payload: user }));
      });
    }
  }

  login(email: string, password: string) {
    return this.httpClient.get<User[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(user => user.email === email && user.password === password);

        if(!user) {
          throw new Error('Invalid credentials');
        }

        this.setToken(`${user.email}&${user.password}`);
        this.store.dispatch(setAuthUser({ payload: user }));

        return user;
      }   
    ))
  }

  setToken(email: string): void {
    localStorage.setItem('token', email);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(setAuthUser({ payload: null }));
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

}