import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-detail-model',
  templateUrl: './news-detail-model.component.html',
  styleUrls: ['./news-detail-model.component.scss']
})
export class NewsDetailModelComponent implements OnInit {
  newsDetail:any={};
  pImage:any;
  imagePath:any=environment.imageURL;
  userData:any;
  likeAudio:any;
  media: any;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public  dialogRef: MatDialogRef<NewsDetailModelComponent>,
    private apiService:ApiService,
    private utility:UtilityService
  ) { }

  ngOnInit(): void {
   // console.log(this.data);
    this.apiService.getNewsDetail(this.data).subscribe((res)=>{
      if(res['errors']==null){
        this.newsDetail=res['response'];
        //console.log(this.newsDetail);
      }
    });
    this.pImage='../../../../../../assets/images/profile-icon.png';
    this.userData=this.utility.UserProfile;
    this.likeAudio = new Audio('../../../../../../assets/sound/likebuttonsound.mp3');
    this.media=this.imagePath+'postimages/'+this.newsDetail['mediaurl'];
    
  }
  closeMe() {
    this.dialogRef.close();
  }

  
 
}
