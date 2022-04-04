import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'HeaderLivreur',
  templateUrl: './header-livreur.component.html',
  styleUrls: ['./header-livreur.component.scss']
})
export class HeaderLivreurComponent implements OnInit {
  @Input() goToUrl: any;

  constructor() { this.goToUrl = ()=>{}}

  ngOnInit(): void {
  }

}
