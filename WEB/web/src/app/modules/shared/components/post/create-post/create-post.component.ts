import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { CreatePostModelComponent } from '../../models/create-post-model/create-post-model.component';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  profile:any=[];
  constructor(
    private dialogService:DialogService,
    private router:Router
    ) { }

  ngOnInit(): void {
    let profile:any = JSON.parse(localStorage.getItem('akcon-profile') || 'null');
   this.profile=profile;
  }
  createPostPopup(postType:any){
    if(postType=='news' && this.profile['role']!='admin'){
      
    }else{
     const dialogRef= this.dialogService.openDialog(CreatePostModelComponent,postType,{
        height:'50%',
        width: '60%',
        panelClass: 'create-post-model-popup',
      });
      dialogRef.afterClosed().subscribe((res)=>{
        if(res==true){
          //console.log(res);
          // this.router.navigate(['']);
        }
      });
    }
    
  } 

 
  
}
