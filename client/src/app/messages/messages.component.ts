import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import * as moment from 'moment-timezone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  recieved: object[];
  sent: object[];

  recievedEmpty: boolean;
  sentEmpty: boolean;

  status: string = 'recieved';

  ready: boolean = false;

  constructor(private messagesService: MessagesService, private auth: AuthService) {
    this.messagesService.getRecieved().subscribe(res=> {
      this.recieved = res.messages;
      this.ready = true;
      this.recieved.forEach(message => {
        let timezone;

        this.auth.getUser(message['reciever']).subscribe(user => {
          timezone = user.timezone;
        })

        message['sendDate'] = moment(message['sendDate'], timezone).format();
      })
    });

    this.messagesService.getSent().subscribe(res=> {
      this.ready = true;
      this.sent = res.messages;
      this.sent.forEach(message => {
        let timezone;
        this.auth.getUser(message['sender']).subscribe(user => {
          timezone = user.timezone;
        })

        message['sendDate'] = moment(message['sendDate'], timezone).format();
      })
    });


    this.messagesService.setSeen().subscribe();
  }

  ngOnInit() {
  }

  changeStatus(status: string): void {
    this.status = status;
  }

  updateRecievedDates() {
    this.recieved.forEach(message => {

      
    })
  }

}
