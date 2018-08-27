import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { MessagesService } from '../services/messages.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  ready: boolean = false;
  notFound: boolean = false;
  avatarUrl: string;

  message: string;

  loading: boolean = false;

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
    private flashMessages: FlashMessagesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    let currentUser = this.auth.getCurrentUser();
    this.auth.getUsername(id).subscribe(user => {
      this.user = user;
      this.avatarUrl = this.auth.customAvatarUrl(this.user._id);
      if (user._id == currentUser._id) {
        this.router.navigate(['/profile']);
      }
      this.ready = true;
      console.log("current user:", currentUser._id);
      console.log("visted user:", user._id);
    }, err => {
      this.notFound = true;
    })
  }

  sendMessage(): void {
    this.loading = true;
    this.messagesService.newMessage(this.message, this.user._id).subscribe(res => {
    this.cdr.detectChanges();
    this.loading = false;
    setTimeout(() => {this.flashMessages.show("Your message has been sent.", {cssClass: 'alert-success', timeout: 40000});}, 250);
    
    this.cdr.detectChanges();
    this.message = "";
    this.cdr.detectChanges();
      console.log(res);
    }, err => {
      this.loading = false;
      this.flashMessages.show("Unexpected error occured. Please refresh the page and try again", {cssClass: 'alert-danger', timeout: 40000});
    })
  }

}
