import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  showMe: boolean = true
  showMe1: boolean = false
  pass: boolean = false;
  showMe2: boolean = false;
  idmsg:any='';
  otpmsg:any='';
  pasmsg:any='';
  new_confirm_show: boolean = false
  newPassword: any = {}; //for new password
  confirmPassword: any = {}; //for confirm password
  user: any = {};//for email submit method
  otp: any = {}; // for otp submit method
  constructor(
    public dialog:MatDialog,
    private router: Router,
    private apiService: ApiService,
    private utilityService: UtilityService,
    private dialogService: DialogService,
  ) {
    
   }
  //for show/hide the second form
  show_sec_Form() {
    if (this.showMe1 = true) {
      this.showMe1 = this.showMe
    }
    else {
      this.showMe1=!this.showMe1
    }
  }
  //for show/hide confirm password form
  
  ngOnInit(): void {
  }
  //for otp submission
  public onOtp(item1:NgForm) {
    // console.log(item1);
    this.otp = Object.assign({}, item1);
    const userData1 = {
      otp: this.otp.OTP
    }    
    this.onForgot();
          
  }
//generateOTP api
public generateotp(){
   this.apiService.generateOtp(this.user.email).subscribe((res:any)=>{
     //this.loaderService.stopLoader();
     if(res && res["errors"]== null){
      this.idmsg=res["response"]["message"];
     }      
   });
 }
//verifyotp API
public verifyotp(bodyData:any){
  this.apiService.verifyOtp(bodyData).subscribe((res:any)=>{
    //this.loaderService.stopLoader();
    if(res && res["errors"]== null){
     this.show_third_form();
    }      
  });
}

//set password API
public setpassword(bodyData:any){
  console.log(bodyData);
  this.apiService.setPassword(bodyData).subscribe((res:any)=>{
    //this.loaderService.stopLoader();
    if(res && res["errors"]== null){
     this.otpmsg=res["response"]["msg"];
     this.closeMe();
     this.dialogService.openDialog(ErrorDialogComponent, { message: this.otpmsg , isNavigate: false });

    }      
  });
}

//for email submit
  public onSubmit1(item: NgForm) {
    console.log(item);
    this.user = Object.assign(this.user, item);
    this.generateotp();
  }
  //after otp submit otp method which sends data 
  public onForgot(): void{
    const bodyData={
      id: this.user.email,
      otp: this.otp.OTP,
    }
    this.verifyotp(bodyData);
  }
  //close me button function
  public closeMe() {
    this.dialog.closeAll();
  }
//function for the new password and confirm password form
  public onpasswordSubmit(item: NgForm) {
    this.newPassword = Object.assign(this.newPassword, item);
    this.confirmPassword = Object.assign(this.confirmPassword, item);
    if (this.newPassword.new_password!=this.confirmPassword.confirm_password) {
      this.pass = true;
    }
    else {
      this.pass = false;
      const bodyData = {
      id:this.user.email,
      new_password : this.newPassword.new_password,
      confirm_password: this.confirmPassword.confirm_password,
      }
      this.setpassword(bodyData);
      this.new_confirm_show = true
    }
    
    
  }
 
//function for show new/confirm password form and hide another form
   show_third_form() {
      this.showMe = false
      this.showMe1 = false
      this.showMe2 = true
  }
}
