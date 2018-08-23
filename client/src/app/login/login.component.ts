import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as $ from 'jquery';

import { AuthService } from '../services/auth.service';

import { User } from '../user';
import { OldUser } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser: User;

  username: string;
  password: string;

  constructor(private auth: AuthService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  validateInputs(event: any): void {
    if (event.target.value.length < 4) {
      if (!event.target.classList.contains('error')) {
        event.target.classList.add('error');
      }
    } else {
      if (event.target.classList.contains('error')) {
          event.target.classList.remove('error');
        }
    }
  }

  isReady(): boolean {
    if (this.username.length < 4 || this.password.length < 4) {
      return false;
    } else {
      return true;
    }
  }

  onFormSubmit() {
    if (this.isReady()) {
      let oldUser: OldUser = {username: this.username, password: this.password}
      this.auth.logIn(oldUser).subscribe((res) => {
        this.auth.saveUser(res);
        this.flashMessages.show("Successfully logged in", {cssClass: 'alert-success', timeout: 20000});
        $('form input').removeClass('error');
        document.location.reload();
      }, err => {
        if (err.status === 401) {
          this.flashMessages.show("Invalid creditentials", {cssClass: 'alert-danger', timeout: 2000});
          $('form input').addClass('error');
        }
      })
    } else {
      this.flashMessages.show('Please enter valid credintials', {cssClass: 'alert-danger', timeout: 10000});
    }
  }

}
