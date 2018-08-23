import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../user';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  
  cards: object;
  user: User;

  constructor(private auth: AuthService, private messagesService: MessagesService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.cards = {
      'new-user': {title: "Wohooo!", value: "Welcome to Honest notes. Try searching for your friends using the search field in the sidebar"},
      'email-verify': {title: "Verify e-mail", value: "Please verify your email to get the most of Honest Notes"},
      'new-messages': {title: "New messages", value: "Pssst, you have new messages. Check them now"},
      'no-new': {title: "Gain more feedback", value: `Share your profile now to get more feedback from your friends. Here's your profile link: http://localhost:4200/user/${this.user._id}/verify`}
    };
  }

  generateCards(): any {
    // console.log("Function running");
    let isNew: boolean = false;
    let isVerified: boolean = this.user.activationStatus;
    let newMessages: boolean = false;
    let noNew: boolean = false;


    var cards = [];


    


    this.messagesService.unreadNumber().subscribe(res => {
      if (res.unseen > 0) {
        newMessages = true;
        cards.push(this.cards['new-messages']);
        // console.log('messages', this.cards['new-messages'])
        
      }
    });


    if (isVerified === false) {
      cards.push(this.cards['email-verify']);
      // console.log('email', this.cards['email-verify'])
    }

    if (this.user.loginHistory.length < 3) {
      cards.push(this.cards['new-user']);
    }

    if (cards.length === 0) {
      cards.push(this.cards['no-new']);
      // console.log('no-new', this.cards['no-new'])
    }

    
    // console.log(cards);
    // console.log(this.cards);
    
    return cards;
  }


}
