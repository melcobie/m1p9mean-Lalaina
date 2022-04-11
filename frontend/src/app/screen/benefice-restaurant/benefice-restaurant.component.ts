import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BeneficeService } from 'src/app/helper/benefice-service';
import { AppState } from 'src/app/reducer';
import { User } from 'src/app/reducer/user-reducer/type';

@Component({
  selector: 'app-benefice-restaurant',
  templateUrl: './benefice-restaurant.component.html',
  styleUrls: ['./benefice-restaurant.component.scss']
})
export class BeneficeRestaurantComponent implements OnInit {
  benefice: any;
  restaurant: User|any;
  loader: boolean = false;
  noData: boolean = false;

  constructor(
    private service: BeneficeService,
    private store: Store<AppState>,
  ) { 
    this.store.select("userState")
      .subscribe( user => this.restaurant = user.user );
  }

  ngOnInit(): void {
    this.loader = true;
    this.service.beneficeRestaurant(this.restaurant._id)
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

}
