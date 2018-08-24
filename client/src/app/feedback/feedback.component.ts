import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  message: string;
  sent: boolean = false;

  constructor(private messagesService: MessagesService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onSend(): void {
    console.log(this.message);
    if (this.message.length < 5) {
      this.flashMessages.show("Explain more details so we can help you.", {cssClass: 'alert-danger', timeout: 10000});
    } else {
      this.messagesService.newFeedback(this.message).subscribe(res => {
        this.sent = true;
      }, () => {
        this.flashMessages.show("An unexpected error occured. Please try again later", {cssClass: 'alert-danger', timeout: 10000});
      })
    }

      
  }

}
