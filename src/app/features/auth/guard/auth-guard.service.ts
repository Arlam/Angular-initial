import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authenticationService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    console.log('AuthGuard');
    if (this.authenticationService.isAuthenticated()) {
      console.log('Yes');
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
