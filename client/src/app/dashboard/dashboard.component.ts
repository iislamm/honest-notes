import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards: object[];

  constructor(private cardsService: CardsService) {
    this.cards = this.cardsService.generateCards();
    console.log(this.cards);
  }

  ngOnInit() {
  }

}
