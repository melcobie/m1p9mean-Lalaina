import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'HeaderAdmin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  url: string = window.location.href;
  active: any ={
    restaurant: false,
    livreur: false,
    commande: false,
    benefice: false,
  }
 constructor() { 
   
 }

  ngOnInit(): void {
    this.active.restaurant = this.url.includes("/restaurants")? true: false;
    this.active.livreur = this.url.includes("/livreurs")? true: false;
    this.active.commande = this.url.includes("/commande")? true: false;
    this.active.livreur = this.url.includes("/benefice")? true: false;
  }

}
