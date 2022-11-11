import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messageuserlist',
  templateUrl: './messageuserlist.component.html',
  styleUrls: [ './messageuserlist.component.scss' ]
})
export class MessageuserlistComponent implements OnInit {
  pImage: any
  messageList: any = [];
  userList: any;
  activeUser: any = [];
  chatHistory: any;
  messageDate: any;
  user: any
  imagePath = environment.imageURL;
  constructor(
    private socket: WebSocketService,
    private apiService: ApiService,
    private userService: UtilityService,
    private dialogService: MatDialogRef<MessageuserlistComponent>,
  ) { }

  ngOnInit(): void {
    this.pImage = "../../../../../assets/images/profile-icon.png";
    this.user = this.userService.UserProfile
    // console.log(this.user['email']);
    this.apiService.getUserList().subscribe((res) => {
      if (res && res[ 'errors' ] == null) {
        this.userList = res[ 'response' ];
        // this.showChat(res['response'][0]);
        // console.log(this.userList);
      }
    });
    this.socket.getMessage().subscribe((res) => {
      if (res[ 'sender' ] == this.user[ 'email' ] || res[ 'receiver' ] == this.user[ 'email' ]) {
        this.chatHistory.push(res);
      }
    })
  }
  closeMe() {
    this.dialogService.close();
  }

}
