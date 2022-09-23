import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/component/login/login.component';
import { AuthGuard } from '@app/features/auth/guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./features/auth/auth.module').then((m)=> m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
