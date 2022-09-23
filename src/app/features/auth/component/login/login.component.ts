import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  error: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService.login(this.formGroup.value).subscribe({
      next: () => {
        const defaultUrl = this.navigationService.getUserDefaultRoute();
        void this.router.navigate([defaultUrl]);
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.message as string;
        console.error(error);
      },
    });
  }

}
