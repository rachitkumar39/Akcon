import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from '../modules/shared/components/error-dialog/error-dialog.component';
import { DialogService } from './dialog.service';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService  implements HttpInterceptor {

  constructor(private router: Router, private dialogService: DialogService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.loaderService.startLoader();
    return next.handle(request).pipe(
        map((event: any) => {
          
            if (event.status == '200') {
                return event;
            } 

        }),
        catchError(error => {
             if (error.status > 400) {
                localStorage.removeItem('akcon-profile');
                localStorage.removeItem('akcon-login');
                this.dialogService.openDialog(ErrorDialogComponent, { message: error.error.errors?.msg, isNavigate: false });
                this.router.navigateByUrl('/login');
                
            } else if(error.status === 400){
              localStorage.removeItem('akcon-profile');
              localStorage.removeItem('akcon-login');
              console.error(error.error.errors?.msg);
              this.dialogService.openDialog(ErrorDialogComponent, { message: error.error.errors?.msg , isNavigate: false });
            }
            return throwError(error);
        }));
}

}
