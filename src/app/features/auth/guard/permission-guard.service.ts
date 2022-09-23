import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { CurrentUserService } from '@app/features/auth/service/current-user.service';
import { Permission } from '@app/features/auth/model/permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private currentUserService: CurrentUserService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const permissions: Permission[] = route.data.permissions;
    if (this.currentUserService.hasAnyPermission(permissions)) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
