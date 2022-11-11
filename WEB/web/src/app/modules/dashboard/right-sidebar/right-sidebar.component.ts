import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { PostDetailModelComponent } from 'src/app/modules/shared/components/models/post-detail-model/post-detail-model.component'
@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  isExpanded=true;
  lastEventId:string="0";
  eventList:any=[];
  expandItems() {
    this.isExpanded = true;
  }
  
  constructor(
    private apiService:ApiService,
    private dialogService:DialogService,
  ) { }

  ngOnInit(): void {
    this.apiService.getEventList(this.lastEventId).subscribe((res:any)=>{
      if(res && res["errors"]== null){
       this.eventList=res["response"];
       if(Object.keys(res["response"]).length<2){
          console.log(this.eventList);
        this.isExpanded=false;
        }
       }
    });
  }
  

  public more(){
    this.lastEventId=this.eventList[Object.keys(this.eventList).length-1]["_id"];
    // console.log(this.lastEventId);
    this.apiService.getEventList(this.lastEventId).subscribe((res:any)=>{
      if(res && res["errors"]== null){
        this.eventList.push(...res["response"]);
        if(Object.keys(res["response"]).length<5){
          this.isExpanded=false;
        }
       }      
     });
  }
  trackById(index:number,id:any):string{
    return this.eventList[index]["_id"];
  }

  eventDetail(eventid:any){
      this.dialogService.openDialog(PostDetailModelComponent,eventid,{
        height:'700px',
        width: '60%',
        panelClass: 'post-detail-model'
      });
  
    } 
  
}
