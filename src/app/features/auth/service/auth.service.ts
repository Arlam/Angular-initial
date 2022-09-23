import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { CurrentUserService } from './current-user.service';
import { CurrentUser } from '../model/current-user';

export interface Credentials {
  username: string,
  password: string,
}

export interface TokenResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    private http: HttpClient) {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !this.jwtHelperService.isTokenExpired(this.cast(token));
  }

  login(credentials: Credentials): Observable<CurrentUser> {
    return this.http.post<TokenResponse>('/auth/login', {
      ...credentials
    }).pipe(
      switchMap(response => {
        if(this.jwtHelperService.isTokenExpired(response.token)){
          console.log(response);
          throw new Error('Authentification failed. Token is not valid');
        }
        localStorage.setItem("token", response.token);
        return this.http.get<CurrentUser>('/current-user');
      }),
      switchMap(currentUser => {
        this.currentUserService.next(currentUser);
        return of(currentUser);
      })
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    this.currentUserService.next(null);
    void this.router.navigate(['/login']);
  }

  init(): Observable<CurrentUser | undefined> {
    const token = localStorage.getItem('token')

    let isExpired = true;
    try {
      isExpired = this.jwtHelperService.isTokenExpired(this.cast(token));
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      this.currentUserService.next(null);
      return of(undefined);
    }

    if (isExpired) {
      console.log("Token has expired");
      localStorage.removeItem("token");
      this.currentUserService.next(null);
      return of(undefined);
    }
    return this.http.get<CurrentUser>('/current-user')
      .pipe(
        map(currentUser => {
          this.currentUserService.next(currentUser);
          return currentUser;
        }),
        catchError(() => {
          this.currentUserService.next(null);
          return of(undefined);
        })
      )

  }

  cast(v: string | null): string | undefined {
    if (v == undefined) {
      return undefined;
    }
    return v as string;
  }
}
