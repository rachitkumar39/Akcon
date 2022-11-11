import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-profile-photo-model',
  templateUrl: './show-profile-photo-model.component.html',
  styleUrls: ['./show-profile-photo-model.component.scss']
})
export class ShowProfilePhotoModelComponent implements OnInit {
  profile: any;
  activeId: any;
  userData: any;
  pImage: any;
  imagePath: string = environment.imageURL;
  
  constructor(
    private dialogRef: MatDialogRef<ShowProfilePhotoModelComponent>,
    private apiservice: ApiService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utility:UtilityService

  ) { }

  ngOnInit(): void {
    // console.log("hello");
    console.log(this.data);
    
    this.pImage='../../../../../assets/images/profile-icon.png';
   
  }
  closeMe() {
    this.dialogRef.close();
  }
}
