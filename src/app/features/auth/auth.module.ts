import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HasPermissionDirective } from '@app/features/auth/directive/has-permission.directive';



@NgModule({
  declarations: [
    LoginComponent,
    HasPermissionDirective
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [HasPermissionDirective]
})
export class AuthModule { }
