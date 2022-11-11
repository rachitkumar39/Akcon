import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ResizeImageModelComponent } from '../resize-image-model/resize-image-model.component';

@Component({
  selector: 'app-create-post-model',
  templateUrl: './create-post-model.component.html',
  styleUrls: ['./create-post-model.component.scss']
})
export class CreatePostModelComponent implements OnInit {
  type: any;
  image:any='';
  isTitle:boolean=true;
  isDescription:boolean=true;
  isDate: boolean=true;
  isImage:boolean=true;
  reqTitle:boolean=false;
  reqDescription:boolean=false;
  reqDate:boolean=false;
  reqImage:boolean=false;
  selctedImage:boolean=false;
  isPostCreated:boolean=false;
  
 
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public  dialogRef: MatDialogRef<CreatePostModelComponent>,
    private apiService:ApiService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.type=this.data;
    if(this.data=='image'){
      this.isTitle=false;
      this.isDate=false;
      this.reqDescription=true;
      this.reqImage=true;
    }else if(this.data=='event'){
      this.reqTitle=true;
      this.reqDescription=true;
      this.reqDate=true;
      this.reqImage=true;
    }else if(this.data=='news'){
      this.isDate=false;
      this.reqTitle=true;
      this.reqDescription=true;
      this.reqImage=true;
    }else if(this.data=='text'){
      this.isImage=false;
      this.isDate=false;
      this.isTitle=false;
      this.reqDescription=true;
   }
  }


   imagePopup()
  {
    const dialogRef= this.dialog.open(ResizeImageModelComponent,{
      height:'550px',
      width: '900px',
      panelClass: 'resize-image-model',
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined){
        this.selctedImage=true;
        this.image=result;
      }
    });
  }

   dataURLtoFile(dataurl:any, filename:any="abc.png") {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
  closeMe() {
    this.dialogRef.close(this.isPostCreated);
    //this.dialog.closeAll();
  }
  //submit create post model data
  createPostModelForm = new FormGroup({
    title : new FormControl(''),
    discription : new FormControl(''),
    event_date : new FormControl(''),
  } 
  );


  submitCreatePostModel(){
    if(this.data=='image' && this.image!=''){
      const img=this.dataURLtoFile(this.image);
      const formData=new FormData();
      formData.append('type',"post");
      formData.append('image',img);
      
      this.apiService.uploadImage(formData).subscribe((res)=>{
        if(res['errors']==null)
        {
          const mediaurl=res['response']['mediaurl'];
          //console.log(mediaurl);
          const bodyData = {
            type:this.type,
            ismedia:"1",
            description: this.createPostModelForm.value.discription,
            mediaurl:res['response']['mediaurl']
          }
          this.apiService.createPost(bodyData).subscribe((res)=>{
          });
        }
      });
      
    }else if(this.data=='event' && this.image!=''){
      const img=this.dataURLtoFile(this.image);
      const formData=new FormData();
      formData.append('type',"post");
      formData.append('image',img);
      this.apiService.uploadImage(formData).subscribe((res)=>{
        if(res['errors']==null)
        {
          const mediaurl=res['response']['mediaurl'];
          //console.log(mediaurl);
          const bodyData = {
            type:this.type,
            ismedia:"1",
            event_date:this.createPostModelForm.value.event_date,
            title:this.createPostModelForm.value.title,
            description: this.createPostModelForm.value.discription,
            mediaurl:res['response']['mediaurl']
          }
          this.apiService.createPost(bodyData).subscribe((res)=>{
          });
        }
      });
    }else if(this.data=='news' && this.image!=''){
      const img=this.dataURLtoFile(this.image);
      const formData=new FormData();
      formData.append('type',"news");
      formData.append('image',img);
      this.apiService.uploadImage(formData).subscribe((res)=>{
        if(res['errors']==null)
        {
          const mediaurl=res['response']['mediaurl'];
          //console.log(mediaurl);
          const bodyData = {
            type:this.type,
            ismedia:"1",
            title:this.createPostModelForm.value.title,
            description: this.createPostModelForm.value.discription,
            mediaurl:res['response']['mediaurl']
          }
          debugger;
          this.apiService.createNews(bodyData).subscribe((res)=>{
          });
        }
      });
    }else if(this.data=='text'){
      const bodyData = {
        type:this.type,
        ismedia:"0",
        title:this.createPostModelForm.value.title,
        description: this.createPostModelForm.value.discription,
        mediaurl:""
      }
      this.apiService.createPost(bodyData).subscribe((res)=>{
      });
    }
    this.isPostCreated=true;
    this.dialogRef.close(this.isPostCreated);
    // this.dialog.closeAll();
  }
}