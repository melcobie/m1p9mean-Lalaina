import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'HeaderAdmin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  @Input() goToUrl: any;

  constructor() { this.goToUrl = ()=>{}}

  ngOnInit(): void {
  }

}
