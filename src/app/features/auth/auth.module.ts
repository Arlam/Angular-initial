import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
