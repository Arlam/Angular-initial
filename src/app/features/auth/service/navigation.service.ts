import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  getUserDefaultRoute(): string {
    return '/';
  }

  constructor() { }
}
