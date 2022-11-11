import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { PostDetailModelComponent } from '../../models/post-detail-model/post-detail-model.component';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { MessageuserlistComponent } from '../../models/messageuserlist/messageuserlist.component';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  imagePath:string=environment.imageURL;
  pImage:any
  readMore = false;
  userData:any;
  commentbox:any='';
  isliked:boolean=false;
  commentPage:number=0;
  ismorecomments:boolean=true;
  commentList:any=[];
  likePostId:string='';
  likeAudio:any;
  closeCommentBoxId:string="";
  isOpenCommentBox:boolean=false;
  readid:string='';
  lastPostId:string='0';
  postList: any=[];
  isExpanded: boolean=true;
  constructor(
    private dialogService: DialogService,
    private dialogService1: MatDialog,
    private apiService:ApiService,
    private utility: UtilityService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.apiService.getPostList(this.lastPostId).subscribe((res:any)=>{
      if(res && res["errors"]== null){
        this.postList = res[ "response" ];
        console.log(this.postList);
        console.log("hello");
       if(Object.keys(res["response"]).length<4){
       this.isExpanded=false;
      }
       }      
    });
    this.pImage="../../../../../../assets/images/profile-icon.png";
    this.userData=this.utility.UserProfile;
    this.likeAudio = new Audio('../../../../../../assets/sound/likebuttonsound.mp3');
    
    
  }
  showPostDetail(postid:any){
    this.dialogService.openDialog(PostDetailModelComponent,postid,{
      height:'700px',
      width: '60%',
      panelClass: 'post-detail-model'
    });

  } 

  public more(){
    this.lastPostId=this.postList[Object.keys(this.postList).length-1]["_id"];
    // console.log(this.lastNewsId);
    //this.lastPostId+=1;
    this.apiService.getPostList(this.lastPostId).subscribe((res:any)=>{
      if(res && res["errors"]== null){
        this.postList.push(...res["response"]);
        if(Object.keys(res["response"]).length<4){
         this.isExpanded=false;
        }
       }      
     });
  }


  readMoreFun(postid:any){
    this.readMore=true;
    this.readid=postid;
  }

  showcommentbox(postid:any){
    this.commentPage=1;
    const bodydata={
      id:postid,
      page:this.commentPage
    }
    if(this.closeCommentBoxId==''){
      this.closeCommentBoxId=postid;
      this.isOpenCommentBox=true;
      //api for comments
      
      this.apiService.getComment(bodydata).subscribe((res:any)=>{
        if(res && res["errors"]== null){
         this.commentList=res["response"];
          // console.log("hello");
         console.log(res["response"]);
         if(Object.keys(res["response"]).length<3){
          this.ismorecomments=false;
         }
         else{
          this.ismorecomments=true;
         }
        }      
      });
    }else{
      if(this.closeCommentBoxId==postid){
        this.isOpenCommentBox=!this.isOpenCommentBox;
        this.closeCommentBoxId=''
      }else{
        this.closeCommentBoxId=postid;
        //api for comments
      
      this.apiService.getComment(bodydata).subscribe((res:any)=>{
        if(res && res["errors"]== null){
         this.commentList=res["response"];
         console.log(res["response"]);
         if(Object.keys(res["response"]).length<3){
          this.ismorecomments=false;
         }else{
          this.ismorecomments=true;
         }
        }      
      });
      }
    }
    this.commentbox=postid;
  }

  sendcomment(item:NgForm,postId:any,index:any){
    this.commentbox= Object.assign(this.commentbox,item);
    const bodyData = {
      comment : this.commentbox.commentText,
      id:postId
    }
    // submitComment
    let newComment:any={};
    newComment['comment']=this.commentbox.commentText;
    newComment['first_name']=this.userData['first_name'];
    newComment['last_name']=this.userData['last_name'];
    newComment['id']=this.userData['email'];
    newComment['profile']="";
    this.commentList.unshift(newComment);
    this.postList[index].comment_count+=1;
    this.apiService.comment(bodyData).subscribe((res)=>{});
  }

  like(postid:any,index:any){
   this.likePostId=postid;
   if(this.postList[index].like.indexOf(this.userData['email']) <0 ){
    this.likeAudio.play();
    this.postList[index].like_count+=1; 
    this.postList[index].like.push(this.userData['email']); 
    this.apiService.like(postid).subscribe((res:any)=>{});
    
   } 
   else{
    this.postList[index].like.pop(this.userData['email']); 
    console.log(this.postList[index].like);
    this.postList[index].like_count-=1;
    this.apiService.disLike(postid).subscribe((res:any)=>{});
    //unlikeapi
   }
  }

  showmorecomment(postid:any){
    this.commentPage+=1;
    const bodydata={
      id:postid,
      page:this.commentPage
    }
    this.apiService.getComment(bodydata).subscribe((res:any)=>{
      if(res && res["errors"]== null){
       this.commentList.push(...res["response"]);
       console.log(res["response"]);
       if(Object.keys(res["response"]).length<3){
        this.ismorecomments=false;
       }else{
        this.ismorecomments=true;
       }
      }      
    });
  }
  deleteComment(comment:any,postid:any,index:number){
    const bodydata={
      userid:this.userData['email'],
      comment:comment,
      postid:postid
    };
    for(var i=0;i<this.commentList.length;i++){ 
      if(i===index){ 
        this.commentList.splice(i, 1); 
      }
    }
    
    this.apiService.deleteComment(bodydata).subscribe((res)=>{});
  }

  trackByComment(index:any, c:any){
    return c['comment']; 
  }

  onScroll(){
    if(this.isExpanded){
      this.more();
      console.log(this.postList);
    }
  }
  showProfile(id: any) {
    
    this.router.navigate(['/profile',id]);
  }
  deletePost(id:any){
    console.log('delete post');
  }
  share() {
    this.dialogService1.open(MessageuserlistComponent, {
      height: '500px',
      width: '700px',
      panelClass: 'message-user-list',
    });
  }
}
