import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginResponse: any;
  formData: any={};
  errmsg: string='';
  constructor(
    public dialog:MatDialog,
    private router: Router,
    private apiService: ApiService,
    private utilityService: UtilityService,
    private dialogService: DialogService,
  ) { }
//route to the login screen
  gotowelcome(){
    this.router.navigate(['/welcome']);
  }
  //for reset popup component
  forgot(){
    this.dialog.open(ForgotPasswordComponent, {
      height: '500px',
      width: '900px'
    });
  } 
  //for show and hide password functionality
  public showPassword: boolean = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }
  
  public onSubmit(item:NgForm) {
    this.formData = Object.assign(this.formData, item);
    //console.log(this.formData);
    this.onLogin();
  }
  
  public onLogin(): void{
   console.log("login");
    const bodyData={
      id: this.formData.username,
      password: this.formData.password,
    };
    this.apiService.login(bodyData).subscribe((res:any)=>{
      //this.loaderService.stopLoader();
      if(res && res["errors"]== null){
        localStorage.setItem('akcon-profile',JSON.stringify(res.response.user))
        //this.utilityService.SetUserProfile(bodyData);
        this.router.navigate(['']);
      }else{
        this.errmsg= res['error'].msg;
        console.log(res['error'].msg);
      }
       
    });
  }

}


