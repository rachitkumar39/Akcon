import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private arouter:ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let profile:any = JSON.parse(localStorage.getItem('akcon-profile') || 'null');
      if(profile && profile['token']){
            return true;
          } else{
            this.router.navigateByUrl('/login');
          }
          return false;
      }
}
