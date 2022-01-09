import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '@app/services/http.service';
import { StorageService } from '@app/services/storage.service';
import { SpinnerService } from '@app/services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(
        private httpService: HttpService,
        private storageService: StorageService,
        private router: Router,
        private spinnerService: SpinnerService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        let withLoader = true;
        if (req.url.includes('notifications')) {
            withLoader = false;
        }

        if (withLoader) {
            this.spinnerService.show();
        }

        if (req.withCredentials !== undefined && req.withCredentials) {
            return next.handle(this.addAuthenticationToken(req)).pipe(
                catchError((err: HttpErrorResponse) => {
                    if (
                        err?.status === 401 &&
                        !req.url.includes('/login')
                    ) {
                        StorageService.clear();
                        this.router.navigate(['/login']);
                    }

                    return throwError(err);
                }),
                tap(() => {
                    if (withLoader) {
                        this.spinnerService.hide();
                    }
                }),
            );
        }

        return next.handle(req).pipe(
            tap(() => {
                if (withLoader) { this.spinnerService.hide(); }
            }),
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        if (!StorageService.authToken) {
            return request;
        }

        return request.clone({
            headers: request.headers.set('Authorization', `Bearer ${StorageService.authToken}`),
            withCredentials: undefined,
        });
    }
}
