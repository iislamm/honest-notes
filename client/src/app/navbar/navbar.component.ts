import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faCog = faCog;
  unseen: number;
  avatarUrl: string;

  constructor(public messagesService: MessagesService, private auth: AuthService, private router: Router) {

    this.updateUnread();

    this.avatarUrl = this.auth.avatarUrl();

  }

  ngOnInit() {

    $('#collapse-toggle').click(function() {
      if ($('#co1lapsed-nav').css('left') !== '0px') {
        $('#co1lapsed-nav').animate({ left: 0 }, 500)
      } else {
        $('#co1lapsed-nav').animate({ left: '-80%' }, 500)
      }
    });
    if ($(window).height() < 500) {
      $('.collapsed-nav-content').height(600);
    } else {
      $('.collapsed-nav-content').height($(window).height());
    }

    $(window).resize(function() {
      if ($(window).height() < 500) {
        $('#collapsed-nav-content').height(600);
      } else {
        $('#collapsed-nav-content').height($(window).height() - 50);
      }
    })
  }

  updateUnread(): void {
    this.messagesService.unreadNumber().subscribe(res => {
      this.unseen = res.unseen;
    });
  }

  logOut(): void {
    this.auth.logOut();
    document.location.reload();
  }

}
