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
    commandes: false,
    benefice: false,
  }
 constructor() { 
  this.active.plats = this.url.includes("/plats")? true: false;
  this.active.commandes = this.url.includes("/commande")? true: false;
  this.active.benefice = this.url.includes("/benefice")? true: false;
 }

  ngOnInit(): void {
    
  }

}
