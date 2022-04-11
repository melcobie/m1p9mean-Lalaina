import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if(error.status === 401 || error.status === 403){
                        this.router.navigateByUrl("not-authorized")
                    }
                    return throwError(error);
                })
            )
    }
}