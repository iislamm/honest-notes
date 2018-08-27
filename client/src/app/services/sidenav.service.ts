import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private sidenav: MatSidenav;


    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
      console.log("ran");
      if ($(window).width() <= 900) {
        return this.sidenav.close();
      }
    }

    public toggle(): void {
    this.sidenav.toggle();
   }
}
