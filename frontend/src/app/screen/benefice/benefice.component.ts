import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BeneficeService } from 'src/app/helper/benefice-service';
import { AppState } from 'src/app/reducer';
import { User } from 'src/app/reducer/user-reducer/type';

@Component({
  selector: 'app-benefice',
  templateUrl: './benefice.component.html',
  styleUrls: ['./benefice.component.scss']
})
export class BeneficeComponent implements OnInit {
  benefice: any;
  loader: boolean = false;
  noData: boolean = false;

  daily: boolean = true;

  constructor(
    private service: BeneficeService,
  ) { 
  }

  ngOnInit(): void {
    this.loader = true;
    this.service.beneficeParJour()
      .subscribe((data: any) => {
        this.benefice = data;
        this.noData = false;
        if(data.length === 0) this.noData = true;
        this.loader = false;
      }, err => {
        console.log(err);
        this.loader = true;
      })
  }

  handle(type: boolean){
    if(this.daily === type) return;
    this.daily = type;
    let service = this.daily
      ? this.service.beneficeParJour()
      : this.service.beneficeParRestaurant()
    service.subscribe((data: any) => {
      this.benefice = data;
      this.noData = false;
      if(data.length === 0) this.noData = true;
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = true;
    })
  }

}
