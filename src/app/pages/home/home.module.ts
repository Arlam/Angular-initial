import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from '@app/pages/home/home-routing.module';
import { AuthModule } from "@app/features/auth/auth.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule {
}
