import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
import { MessageComponent } from '../message/message.component';
import { ProfileContactModelComponent } from '../models/profile-contact-model/profile-contact-model.component';
import { ProfileEducationModelComponent } from '../models/profile-education-model/profile-education-model.component';
import { ProfileExperienceModelComponent } from '../models/profile-experience-model/profile-experience-model.component';
import { ProfilePersonalDetailEditModelComponent } from '../models/profile-personal-detail-edit-model/profile-personal-detail-edit-model.component';
import { ProfileSkillsModelComponent } from '../models/profile-skills-model/profile-skills-model.component';
import { ResizeImageModelComponent } from '../models/resize-image-model/resize-image-model.component';
import { ShowProfilePhotoModelComponent } from '../models/show-profile-photo-model/show-profile-photo-model.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pImage:any;
  imagePath:string=environment.imageURL;
  userData:any;
  activeId:any;
  profile:any;

  name: string = 'rachit kumar';
  clg: string = 'ajay kumar garg engineering college,ghaziabad';
  org: string = 'Tech M';
  college: boolean = false;
  organization: boolean = true;
  distt: string = 'bijnor';
  state: string = 'uttar pradesh';
  country: string = 'india';
  course: string = 'masters of computers application'
  specialization: string = 'computer science & it'
  skill: string = 'angular'
  skill1: string = 'java'
  position: string = 'associate software engineer'
  expYear: string = '2018-2022'
  passingYear: string = '2018'
  email: string = 'rachitrajputsisodia@gmail.com'
  url: string = 'https://www.linkedin.com/in/rachit-kumar-500021213/'
  selctedImage: any
  image: any
  constructor(
    private dialogService: MatDialog,
    private dialogService1:DialogService,
    private apiService: ApiService,
    private utility:UtilityService,
    private router:Router,
    private route:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.activeId=this.route.snapshot.paramMap.get('id');
    // console.log(this.activeId);
    this.pImage='../../../../../assets/images/profile-icon.png';
    this.userData=this.utility.UserProfile;
    this.apiService.getprofile(this.activeId).subscribe((res)=>{
      if(res && res['errors']==null){
        this.profile=res['response'];
        console.log(this.profile);
        
      }
    });
  }
  imagePopup() {
    const dialogRef = this.dialogService.open(ResizeImageModelComponent, {
      height: '500px',
      width: '900px',
      panelClass: 'resize-image-model',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.selctedImage = true;
        this.image = result;
        this.updateProfileImage();
      }
    });
    
  }
  dataURLtoFile(dataurl: any, filename: any = "abc.png") {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  updateProfileImage() {
    if (this.image != '') {
      const img = this.dataURLtoFile(this.image);
      const formData = new FormData();
      formData.append('type', "profile");
      formData.append('image', img);
      this.apiService.uploadImage(formData).subscribe((res) => {
        if (res['errors'] == null) {
          const mediaurl = res['response']['mediaurl'];
          this.userData=this.utility.UserProfile;
          this.userData['image']=mediaurl
          localStorage.removeItem('akcon-profile');
          localStorage.setItem('akcon-profile',JSON.stringify(this.userData));
          this.apiService.updateProfileImage(mediaurl).subscribe((res) => { });
          this.router.navigate(['']);
        }
      });
    }
  }
  showProfileImage(id:any) {
    const dialogRef = this.dialogService1.openDialog(ShowProfilePhotoModelComponent,id,{
      height: '650px',
      width: '900px',
    })
  }
  editPersonalDetail() {
    const dialogRef = this.dialogService.open(ProfilePersonalDetailEditModelComponent, {
      height:'650px',
      width:'900px'
    })
  }
  profileContactModel() {
    const dialogRef = this.dialogService.open(ProfileContactModelComponent, {
      height: '700px',
      width: '900px',
    })
  }
  profileSkills() {
    const dialogRef = this.dialogService.open(ProfileSkillsModelComponent, {
      height: '250px',
      width: '600px',
    })
  }
  profileEducation() {
    const dialogRef = this.dialogService.open(ProfileEducationModelComponent, {
      height: '500px',
      width: '700px',
    })
  }
  profileExperience() {
    const dialogRef = this.dialogService.open(ProfileExperienceModelComponent, {
      height: '500px',
      width: '700px',
    })
  }
  // profileExperience() {
  //   this.dialogService1.openDialog(ShowProfilePhotoModelComponent,this.pImage,{
  //     height:'700px',
  //     width: '500px',
  //   });
  // }
  message(){
    this.router.navigate(['/message']);
    
  }
}
