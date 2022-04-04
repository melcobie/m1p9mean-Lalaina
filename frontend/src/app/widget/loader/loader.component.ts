import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'Loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() height: number = 35;

  constructor() { }

  ngOnInit(): void {
  }

}
