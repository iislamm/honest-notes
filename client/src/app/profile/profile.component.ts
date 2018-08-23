import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  ready: boolean = false;
  notFound: boolean = false;
  avatarUrl: string;

  constructor(private auth: AuthService) {
    this.avatarUrl = this.auth.avatarUrl();
    this.user = this.auth.getCurrentUser();
    if (this.user) {
      this.ready = true;
    } else {
      this.notFound = true;
    }
  }

  ngOnInit() {
  }

}
