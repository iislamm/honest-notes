import { Component, OnInit, ViewChild, AfterViewInit, AfterContentChecked, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  faCog = faCog;
  faBars = faBars;
  unseen: number;
  avatarUrl: string;
  search: string;
  currentUrl: string;

  smallscreen: boolean = false;

  constructor(
    public messagesService: MessagesService,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private media: MediaMatcher,
    private sidenavService: SidenavService,
    private cdr: ChangeDetectorRef
  ) {

    this.avatarUrl = this.auth.avatarUrl();

  }

  // ngAfterViewChecked() {
  //   this.updateUnread();
  // }

  ngAfterViewInit() {
    this.updateNavbar();
    this.cdr.detectChanges();
  }

  // ngAfterContentChecked() {
  //   this.updateNavbar();
  // }

  ngOnInit() {
    // this.sidenavService.setSidenav(this.sidenav);

    this.updateUnread();

    $('#collapse-toggle').click(function() {
      if ($('#co1lapsed-nav').css('left') !== '0px') {
        $('#co1lapsed-nav').animate({ left: 0 }, 500)
      } else {
        $('#co1lapsed-nav').animate({ left: '-80%' }, 500)
      }
    });
    if ($(window).height() < 550) {
      $('.collapsed-nav-content').height(550);
    } else {
      $('.collapsed-nav-content').height($(window).height());
    }

    this.updateNavbar();
  }

  onBackdropClick(): void {
    this.sidenav.open();
    console.log('ran');
    console.log($(window).width() <= 900)
    if ($(window).width() <= 900) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  updateHeight(event) {
    this.updateNavbar()
    if (event.target.innerHeight < 500) {
      $('#collapsed-nav-content').height(500);
    } else {
      $('#collapsed-nav-content').height($(window).height());
    }
  }

  onLinkClick(): void {
    if ($(window).width() < 900) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  updateNavbar(): void {
    if (this.media.matchMedia('(min-width: 900px)').matches == true) {
      this.smallscreen = false;
      $('.mat-drawer-backdrop').hide();
      this.sidenav.open();
    } else {
      this.smallscreen = true;
      $('.mat-drawer-backdrop').show();
      this.sidenav.close();
    }
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
