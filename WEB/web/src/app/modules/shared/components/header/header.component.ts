import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import { ApiService } from '../../../../services/api.service';
import { profile } from 'console';
import { UtilityService } from 'src/app/services/utility.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SignupComponent } from '../signup/signup.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imagePath:string=environment.imageURL;
  pImage:any;
  imageAlt:any
  searchForm:any;
  profile:any=[];
  isSubmitted:boolean = false;
  searchInput1:any = {};
  constructor(
    private dialogService:MatDialog,
    private fb: FormBuilder,
    private userService:UtilityService,
    private route:Router
    ) {}

  ngOnInit(): void {
    let profile:any = JSON.parse(localStorage.getItem('akcon-profile') || 'null');
   this.profile=profile;
    this.searchForm = this.fb.group({
      username:[null, [Validators.required]]
    })
    this.pImage='../../../../../assets/images/profile-icon.png';
    if(this.profile['image']!=''){
      this.pImage=this.profile['image']
    }
    this.imageAlt = 'profile'
  }
  
 
  logout(){
    this.userService.doLogout();
  }
  message(){
    this.route.navigate(['/message']);
  }
  home(){
    this.route.navigate(['']);
  }
  profileDialog(){
    let id=this.profile['email']
    // console.log(id);
    this.route.navigate(['/profile',id]);
  }
  search(){
    
  }
  register(){
    this.dialogService.open(SignupComponent,{
      width: '80%',
      height: '90%',
      panelClass: 'signup-dialog',
    });
  }
  searchForm1 = new FormGroup({
    searchInput : new FormControl(''),
  });
  searchFormData(){
    let id = this.searchForm1.value.searchInput;
    //console.log(id);
    if(id!='')
    this.route.navigate(['/search',id]);
  }
  gotowelcome(){
    this.route.navigate(['/welcome']);
  }
}
