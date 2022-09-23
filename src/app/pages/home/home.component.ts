import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/features/auth/service/auth.service';
import { Permission } from '@app/features/auth/model/permission';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly Permission = Permission;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
