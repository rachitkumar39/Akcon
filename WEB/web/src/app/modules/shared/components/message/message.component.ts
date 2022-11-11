import {  Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  pImage:any
  messageList:any=[];
  userList:any;
  activeUser:any=[];
  chatHistory:any;
  messageDate:any;
  user:any
  imagePath=environment.imageURL;

  constructor(
    private socket:WebSocketService,
    private apiService:ApiService,
    private userService:UtilityService
  ) { }


  ngOnInit(): void {
    this.pImage="../../../../../assets/images/profile-icon.png";
    this.user=this.userService.UserProfile
    // console.log(this.user['email']);
    this.apiService.getUserList().subscribe((res)=>{
      if(res && res['errors']==null){
        this.userList=res['response'];
        this.showChat(res['response'][0]);
       // console.log(this.userList);
      }
    });
    this.socket.getMessage().subscribe((res) => {
      if(res['sender']==this.user['email'] || res['receiver']==this.user['email']){
        this.chatHistory.push(res);
      }
      
    }) 
    
  }
  
  getChatHistory(id:any){
    this.apiService.getChatHistory(id).subscribe((res)=>{
      if(res && res['errors']==null){
        this.chatHistory=res['response'];
        //console.log(this.chatHistory);
      }
    });
  }

  sendMessage() {
    const message = {
      sender:this.user['email'],
      message:this.messageForm.value.message,
      receiver: this.activeUser['id']
    }
    console.log(message);
    this.socket.sendMessage(message);
    this.apiService.createMessage(message).subscribe((res)=>{});
  }
  messageForm = new FormGroup({
    message : new FormControl(''),
  });
  showChat(user:any){
    this.getChatHistory(user['id']);
    this.activeUser=user;
  }

}
