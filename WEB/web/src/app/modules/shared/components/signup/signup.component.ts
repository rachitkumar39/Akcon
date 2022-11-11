import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstName: any = {};
  lastName: any = {};
  email: any = {};
  role: any = {};
  passingYear: any = {};
  gender: any = {};
  contact: any = {};
  rollNo: any = {};
  file: any = {};
  excelFile: any = {};
  constructor(
    public dialog: MatDialog,
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    
  }
  closeMe() {
    this.dialog.closeAll();
  }
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    passingYear: new FormControl(''),
    gender: new FormControl(''),
    contact: new FormControl(''),
    rollNo: new FormControl(''),
  } 
  );
  //excelformgroup
  registerDetail() {
    // console.log(this.registerForm)
    const user = {
      first_name : this.registerForm.value.firstName,
      last_name : this.registerForm.value.lastName,
      email : this.registerForm.value.email,
      role : this.registerForm.value.role,
      passing_year : this.registerForm.value.passingYear,
      gender : this.registerForm.value.gender,
      contact: this.registerForm.value.contact,
      roll: this.registerForm.value.rollNo,
    }
    let users=[]
    
    const obj={
      user
    }
    users.push(obj);
    const userData={
      users
    }
    // console.log(userData);
    this.apiService.register(userData).subscribe((res)=>{});
    this.closeMe();
  }

  //excelfiledata
  excelForm = new FormGroup({
    file: new FormControl(''),
  })
  excelData() {
    
    const userData = {
      file: this.excelForm,
    }
    console.log(userData);
    
  }
  //excel file data
  getFile(event: any) {
    this.excelFile = event.target.files[0];
  }
  submitExcelFile() {
    let fileData = new FormData();
    fileData.set("file", this.excelFile);
    console.log(this.excelFile);

  }
}
