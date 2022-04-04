import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'HeaderRestaurant',
  templateUrl: './header-restaurant.component.html',
  styleUrls: ['./header-restaurant.component.scss']
})
export class HeaderRestaurantComponent implements OnInit {
  @Input() goToUrl: any;

  constructor() { this.goToUrl = ()=>{}}

  ngOnInit(): void {
  }

}
