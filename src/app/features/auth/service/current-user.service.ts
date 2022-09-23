import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, share, tap } from 'rxjs';
import { CurrentUser } from '../model/current-user';
import { Permission } from '../model/permission';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly _currentUser$: BehaviorSubject<CurrentUser|null>;
  private readonly currentUser$: Observable<CurrentUser|null>;

  constructor() {
    this._currentUser$ = new BehaviorSubject<CurrentUser|null>(null);
    this.currentUser$ = this._currentUser$.asObservable().pipe(share());
  }

  public hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some((permission) => this.hasPermission(permission));
  }

  public hasPermission(permission: Permission): boolean {
    let current = this._currentUser$.value;
    if (current == undefined) {
      return false;
    }
    return current.permissions.includes(permission);
  }

  public next(currentUser: CurrentUser|null) {
    this._currentUser$.next(currentUser);
  }
}
