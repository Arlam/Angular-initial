import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { AuthService } from "@app/features/auth/service/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
          if (request.url.includes('current-user')) {
            return throwError(()=> new Error(err.message));
          }
          if ([401, 403].includes(err.status)) {
            // auto logout if 401 or 403 response returned from api
            this.authenticationService.logout();
            return throwError(()=> new Error(err.message));
          }

          const error = (err && err.error && err.error.message) || err.statusText;
          console.error(err);
          return throwError(() => new Error(''));
        }))
    }
}
