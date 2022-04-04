import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EKalyStore } from 'src/app/reducer/user-reducer/type';

@Component({
  selector: 'HeaderClient',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {
  @Input() goToUrl: any;

  constructor() { this.goToUrl = ()=>{}}

  ngOnInit(): void {
  }

}
