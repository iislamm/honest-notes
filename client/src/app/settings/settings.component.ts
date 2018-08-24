import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

import * as $ from 'jquery';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: User;
  changePassword: boolean = false;
  fullname: string;
  email: string;
  bio: string;
  avatar: File;
  
  currentPassword: string;
  newPassword: string;
  verifyPassword: string;

  ops: {[k: string]: any} = {};

  constructor(private auth: AuthService, private flashMessages: FlashMessagesService, private userService: UserService) {
    this.user = this.auth.getCurrentUser();
    console.log(this.user);
    this.fullname = this.user.fullname;
    console.log(this.fullname);
    this.email = this.user.email;
    this.bio = this.user.bio;
  }

  ngOnInit() {
    $('.form-control').focus(function() {
      $(this).removeClass('read');
    }).blur(function() {
      $(this).addClass('read');
    })
    // this.flashMessages.show('test', {cssClass: "alert-danger", timeout: 1000000});
  }

  onChangePasswordClick() {
    this.changePassword = !this.changePassword;
  }

  onFileSelected(event): void {
    this.avatar = <File>event.target.files[0];
  }

  onSave() {
    console.log(this.fullname, "\n" + this.user.fullname);
    if (this.fullname != this.user.fullname) {
      this.ops.fullname = this.fullname;
    }

    if (this.email != this.user.email) {
      this.ops.email = this.email;
    }

    if (this.bio != this.user.bio) {
      this.ops.bio = this.bio;
    }

    if (this.newPassword) {
      console.log("reached");
      if (this.newPassword.length != 0) {
        if (this.newPassword !== this.verifyPassword) {
          this.flashMessages.show("Passwords don't match!", {cssClass: "alert-danger", timeout: 5000});
          return;
        }
        else {
          this.ops.currentPassword = this.currentPassword;
          this.ops.password = this.newPassword;
        }
      }      
    }

    console.log(this.ops);

    this.userService.update(this.ops).subscribe(res => {
      this.flashMessages.show("Successfully updated", {cssClass: 'alert-success'});
    }, (err) => {
      console.log(err);
      this.flashMessages.show(err.error.message, {cssClass: 'alert-danger'});
    })

  }

}
