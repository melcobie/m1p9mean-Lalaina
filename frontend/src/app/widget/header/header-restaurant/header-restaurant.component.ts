import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'HeaderRestaurant',
  templateUrl: './header-restaurant.component.html',
  styleUrls: ['./header-restaurant.component.scss']
})
export class HeaderRestaurantComponent implements OnInit {
  url: string = window.location.href;
  active: any ={
    plats: false,
  }
 constructor() { 
   
 }

  ngOnInit(): void {
    this.active.plats = this.url.includes("/plats")? true: false;
  }

}
