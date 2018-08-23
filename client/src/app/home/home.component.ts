import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  status: String;
  registerStep: Number;

  constructor() { this.registerStep =  1; }

  ngOnInit() {
  }

  setStatus(status: String): void {
    this.status = status;
  }

  nextStep(): void {
    this.registerStep = 2;
  }

}
