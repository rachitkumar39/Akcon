import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-profile-contact-model',
  templateUrl: './profile-contact-model.component.html',
  styleUrls: ['./profile-contact-model.component.scss']
})
export class ProfileContactModelComponent implements OnInit {
  
  profile:any;
  user:any;
  contact:any
  
  Vgit:any;
  Vemail:any;
  Vlinkedin: any;
  Vtwitter: any;
  Vinstagram: any;
  Vfacebook:any;

  email:any = {}
  git:any = {}
  linkedin: any = {}
  twitter: any = {}
  instagram: any = {}
  facebook:any = {}
  constructor(
    private dialogRef : MatDialogRef<ProfileContactModelComponent>,
    private apiService:ApiService,
    private utility:UtilityService
  ) { }

  ngOnInit(): void {
    this.user=this.utility.UserProfile;
    let id=this.user['email'];
    // console.log(id);
    this.apiService.getprofile(id).subscribe((res)=>{
      if(res && res['errors']==null){
        this.profile=res['response'];
        this.contact=this.profile['social_plateform'];
        this.contact.forEach((c:any) => {
          if(c['plateform_name']=='email'){
            this.Vemail=c['url'];
          }
          if(c['plateform_name']=='git'){
            this.Vgit=c['url'];
          }
          if(c['plateform_name']=='linkedin'){
            this.Vlinkedin=c['url'];
          }
          if(c['plateform_name']=='twitter'){
            this.Vtwitter=c['url'];
          }
          if(c['plateform_name']=='instagram'){
            this.Vinstagram=c['url'];
          }
          if(c['plateform_name']=='facebook'){
            this.Vfacebook=c['url'];
          }
        });
      }
    });
  }
  closeMe() {
    this.dialogRef.close();
  }
  profileContactForm = new FormGroup({
    email: new FormControl(''),
    git: new FormControl(''),
    linkedin: new FormControl(''),
    twitter: new FormControl(''),
    instagram: new FormControl(''),
    facebook: new FormControl(''),
  });
  profileContact() {
    const contactData = {
      email: this.profileContactForm.value.email,
      git: this.profileContactForm.value.git,
      linkedin: this.profileContactForm.value.linkedin,
      twitter: this.profileContactForm.value.twitter,
      instagram: this.profileContactForm.value.instagram,
      facebook : this.profileContactForm.value.facebook
    }
    console.log(contactData);
  }
}