import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faCog = faCog;
  unseen: number;
  avatarUrl: string;

  search: string;

  currentUrl: string;

  constructor(public messagesService: MessagesService, private auth: AuthService, private userService: UserService, private router: Router) {

    this.avatarUrl = this.auth.avatarUrl();

  }

  ngOnInit() {

    this.updateUnread();

    $('#collapse-toggle').click(function() {
      if ($('#co1lapsed-nav').css('left') !== '0px') {
        $('#co1lapsed-nav').animate({ left: 0 }, 500)
      } else {
        $('#co1lapsed-nav').animate({ left: '-80%' }, 500)
      }
    });
    if ($(window).height() < 500) {
      $('.collapsed-nav-content').height(500);
    } else {
      $('.collapsed-nav-content').height($(window).height());
    }

    $(window).resize(function() {
      if ($(window).height() < 500) {
        $('#collapsed-nav-content').height(500);
      } else {
        $('#collapsed-nav-content').height($(window).height());
      }
    })
  }

  updateUnread(): void {
    this.messagesService.unreadNumber().subscribe(res => {
      this.unseen = res.unseen;
      console.log(res.unseen);
    });
  }

  logOut(): void {
    this.auth.logOut();
    document.location.reload();
  }

  onSearch(): void {
    
    if (new RegExp("^/search/.*").test(this.router.url) == false) {
      console.log(this.router.url);
      this.currentUrl = this.router.url;
    }
    if (this.search.length != 0) {
      this.router.navigate([`/search/${this.search}`]);
    } else {
      if (this.currentUrl) {
        this.router.navigate([this.currentUrl]);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

}
