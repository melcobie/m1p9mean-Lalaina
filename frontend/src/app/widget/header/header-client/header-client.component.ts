import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EKalyStore } from 'src/app/reducer/user-reducer/type';

@Component({
  selector: 'HeaderClient',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {
  url: string = window.location.href;
  active: any ={
    order: false,
    command: false,
  }
 constructor() { 
   
 }

  ngOnInit(): void {
    this.active.order = this.url.includes("/order")? true: false;
    this.active.command = this.url.includes("/command")? true: false;
  }

}
