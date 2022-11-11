import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  loggedInProfile:any;
  constructor(private apiService: ApiService,
              private router: Router) { }

  public SetUserProfile(data: any){
    this.loggedInProfile= data;
    localStorage.setItem('akcon-login',JSON.stringify(this.loggedInProfile));
  }
  public get loginData(){
    return this.loggedInProfile || JSON.parse(localStorage.getItem('akcon-login') || "null");
  }
  public get UserProfile(){
    return this.loggedInProfile || JSON.parse(localStorage.getItem('akcon-profile') || "null");
  }
  doLogout():void{
    this.loggedInProfile=null;
    localStorage.removeItem('akcon-profile');
    localStorage.removeItem('akcon-login');
    this.router.navigateByUrl('login');
  }
}
