import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'HeaderLivreur',
  templateUrl: './header-livreur.component.html',
  styleUrls: ['./header-livreur.component.scss']
})
export class HeaderLivreurComponent implements OnInit {
  url: string = window.location.href;
  active: any ={
    livreur: false,
  }
 constructor() { 
   
 }

  ngOnInit(): void {
    this.active.livreur = this.url.includes("/commande")? true: false;
  }
}
