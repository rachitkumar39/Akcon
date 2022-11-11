
import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { UtilityService } from './utility.service'

@Injectable()

export class JwtHttpInterceptorService implements HttpInterceptor {

  currentUser:any = {}
  constructor(private utilityService: UtilityService){

  }
  intercept (
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.currentUser = this.utilityService.UserProfile;
    if (this.currentUser &&  this.currentUser.token) {
      request = request.clone({
        setHeaders: {
          'Authorization':  `Bearer ${this.currentUser.token}`,
        }
      })
      
    }
    return next.handle(request)
  }
}