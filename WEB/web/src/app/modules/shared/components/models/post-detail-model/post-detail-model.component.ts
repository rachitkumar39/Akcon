import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-detail-model',
  templateUrl: './post-detail-model.component.html',
  styleUrls: ['./post-detail-model.component.scss']
})
export class PostDetailModelComponent implements OnInit {
  postDetail:any;
  imagePath:any=environment.imageURL;
  userData:any;
  media:any;

  likeAudio:any;
  pImage: any;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public  dialogRef: MatDialogRef<PostDetailModelComponent>,
    private apiService:ApiService,
    private utility: UtilityService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.apiService.getPostDetail(this.data).subscribe((res)=>{
      if(res['errors']==null){
        this.postDetail = res[ 'response' ];
        console.log("hello");
        console.log(this.postDetail);
      }
    });
    this.userData=this.utility.UserProfile;
    this.likeAudio = new Audio('../../../../../../assets/sound/likebuttonsound.mp3');
    this.pImage='../../../../../../assets/images/profile-icon.png';
    this.media=this.imagePath+'postimages/'+this.postDetail['mediaurl'];
    
  }
  closeMe() {
    this.dialogRef.close();
  }

  like(){
    if(this.postDetail.like.indexOf(this.userData['email']) <0 ){
     this.likeAudio.play();
     this.postDetail.like_count+=1; 
     this.postDetail.like.push(this.userData['email']); 
     this.apiService.like(this.data).subscribe((res:any)=>{});
     
    } 
    else{
     this.postDetail.like.pop(this.userData['email']); 
     console.log(this.postDetail.like);
     this.postDetail.like_count-=1;
     this.apiService.disLike(this.data) .subscribe((res:any)=>{});
     //unlikeapi
    }
   }
  showProfile(id: any) {
    this.closeMe();
    this.route.navigate([ '/profile', id ]);
    
 }
}
