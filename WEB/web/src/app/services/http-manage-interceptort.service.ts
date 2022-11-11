// managehttp.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { HttpCancelService } from './http-cancel.service';
import { takeUntil } from 'rxjs/operators';
// import { LoaderService } from './../core/services';

@Injectable()
export class HttpManageInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private httpCancelService: HttpCancelService,
        // private loaderService: LoaderService
        ) {
        // router.events.subscribe((event: NavigationStart)=> {

        //     // Cancel pending calls
        //     if (event.navigationTrigger === 'popstate') {
        //         this.httpCancelService.cancelPendingRequests();
        //     }
        // });
    }

    intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        return next.handle(req).pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()));
    }
}