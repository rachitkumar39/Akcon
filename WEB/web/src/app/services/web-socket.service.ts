import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data));
  }

  getUsers() {
    return this.socket.fromEvent('current_users').pipe(map((data: any) => data));
  }
  
}
