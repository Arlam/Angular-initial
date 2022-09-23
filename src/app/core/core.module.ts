import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@app/core/interceptor/auth.interceptor';
import { BaseUrlInterceptor } from '@app/core/interceptor/base-url.interceptor';
import { ErrorInterceptor } from '@app/core/interceptor/error.interceptor';
import { HttpMockInterceptor } from '@app/core/interceptor/http-mock.interceptor';

export const INTERCEPTORS: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpMockInterceptor, multi: true },
];

@NgModule({
  declarations: [],
  providers: [...INTERCEPTORS],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
