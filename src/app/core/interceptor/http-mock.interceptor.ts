import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUser } from '@app/features/auth/model/current-user';

const USERS: CurrentUser[] = [
    {
        id: 1,
        username: 'first',
        permissions: []
    }
];

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any> | HttpHeaderResponse> {
        if (request.url.endsWith('/api/auth/login') && request.method == 'POST') {
            const successAuthResponse = {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            };
            return this.getResponse(successAuthResponse, 200);
        }
        if (request.url.endsWith('/api/current-user') && request.method == 'GET') {
            return this.getResponse(USERS[0], 200);
        }
        return next.handle(request);
    }

    private getResponse(body: any, status: number): Observable<HttpEvent<any> | HttpHeaderResponse> {
        return new Observable((observer) => {
            observer.next(new HttpResponse<any>({ body: body, status: status }));
            observer.complete();
        });
    }
}
