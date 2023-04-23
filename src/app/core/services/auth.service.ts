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

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    const user = this.getUserFromLocalStorage();

    if (user) {
      this.userSubject = new BehaviorSubject<User>(user);
    } else {
      this.userSubject = new BehaviorSubject<User>({ username: '' });
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
    return this.http
      .post<{ access_token: string; token_type: string }>(
        `${this.apiUrl}/token`,
        { username, password }
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
      )
      .subscribe();
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next({ username: '' });
  }

  getCurrentToken() {
    return this.user$.pipe(map((user) => user.token)).subscribe();
  }
}