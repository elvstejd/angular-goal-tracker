import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject!: BehaviorSubject<User>;
  public user$!: Observable<User>;

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>({ username: '' });

    const userInLocalStorage = this.getUserFromLocalStorage();

    if (userInLocalStorage?.token) {
      const tokenIsValid = !this.tokenExpired(userInLocalStorage?.token);
      if (tokenIsValid) this.userSubject.next(userInLocalStorage);
    }

    this.user$ = this.userSubject.asObservable();
  }

  getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  login({ username, password }: { username: string; password: string }) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http
      .post<{ access_token: string; token_type: string }>(
        `${this.apiUrl}/token`,
        formData
      )
      .pipe(
        map((user: { access_token: string; token_type: string }) => {
          const loggedInUser: User = {
            username,
            token: user.access_token,
          };

          localStorage.setItem('user', JSON.stringify(loggedInUser));
          this.userSubject.next(loggedInUser);

          return loggedInUser;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next({ username: '' });
  }

  getCurrentToken() {
    return this.userSubject.value.token || null;
  }

  tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
