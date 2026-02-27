import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LOGIN, SIGNUP } from '../graphql/graphql.operations';
import { AuthPayload, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apollo = inject(Apollo);
  private readonly router = inject(Router);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  login(usernameOrEmail: string, password: string): Observable<AuthPayload> {
    return this.apollo.query<{ login: AuthPayload }>({
      query: LOGIN,
      variables: { usernameOrEmail, password },
      fetchPolicy: 'network-only',
    }).pipe(
      map(result => result.data!.login),
      tap(payload => {
        localStorage.setItem(this.TOKEN_KEY, payload.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(payload.user));
      })
    );
  }

  signup(username: string, email: string, password: string): Observable<User> {
    return this.apollo.mutate<{ signup: User }>({
      mutation: SIGNUP,
      variables: { username, email, password },
    }).pipe(map(result => result.data!.signup));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.apollo.client.resetStore();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
}
