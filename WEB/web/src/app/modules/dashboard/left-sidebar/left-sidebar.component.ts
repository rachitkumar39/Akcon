import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NewsDetailModelComponent } from '../..';
import { PostDetailModelComponent } from '../../shared/components/models/post-detail-model/post-detail-model.component';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  isExpanded=true;
  lastNewsId:string="0";
  newsList:any=[];
  expandItems() {
    this.isExpanded = true;
  }
  
  constructor(
    private apiService:ApiService,
    private dialogService:DialogService,
  ) { }

  ngOnInit(): void {
    this.apiService.getNewsList(this.lastNewsId).subscribe((res:any)=>{
      if(res && res["errors"]== null){
       this.newsList=res["response"];
       if(Object.keys(res["response"]).length<2){
        this.isExpanded=false;
      }
       }      
    });
  }
  

  public more(){
    this.lastNewsId=this.newsList[Object.keys(this.newsList).length-1]["_id"];
    // console.log(this.lastNewsId);
    this.apiService.getNewsList(this.lastNewsId).subscribe((res:any)=>{
      if(res && res["errors"]== null){
        this.newsList.push(...res["response"]);
        if(Object.keys(res["response"]).length<2){
          this.isExpanded=false;
        }
       }      
     });
  }
  trackById(index:number,id:any):string{
    return this.newsList[index]["_id"];
  }

  newsDetail(newsid:any){
    
      this.dialogService.openDialog(NewsDetailModelComponent,newsid,{
        height:'700px',
        width: '60%',
        panelClass: 'post-detail-model'
      });
  
    }
  
  
}
