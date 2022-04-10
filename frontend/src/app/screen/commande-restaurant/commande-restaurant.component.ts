import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommandeService } from 'src/app/helper/commande-service';
import { AppState } from 'src/app/reducer';

@Component({
  selector: 'app-commande-restaurant',
  templateUrl: './commande-restaurant.component.html',
  styleUrls: ['./commande-restaurant.component.scss'],
  providers: [DatePipe]
})
export class CommandeRestaurantComponent implements OnInit {
  commandes: any[] = [];
  loader: boolean = false;
  noData: boolean = false;
  restaurant: any;

  error = "";

  delivered: boolean = false;

  constructor(
    private store: Store<AppState>,
    private service: CommandeService,
    private datePipe: DatePipe,
    private router: Router,
  ) { 
    this.store.select("userState")
      .subscribe(u => this.restaurant = u.user);
  }

  ngOnInit(): void {
    
    this.loader = true;
    this.service.getCommandesRestaurant(this.restaurant._id, this.delivered, localStorage.getItem("token")||"")
      .subscribe((data: any) => {
        this.commandes = data;
        this.noData = false;
        if(data.length < 1) this.noData = true;
        this.loader = false;
      }, err => {
        this.loader = false;
        this.noData = true;
      })
  }

  date(date: any){
    return this.datePipe.transform(date, "dd-MM-yyyy hh:mm");
  }

  goToDetails(id:string){
    this.router.navigateByUrl("/commande/"+id);
  }

  handle(delivered: boolean){
    if(delivered === this.delivered) return;
    this.delivered = delivered;
    this.loader = true;
    this.service.getCommandesRestaurant(this.restaurant._id, this.delivered, localStorage.getItem("token")||"")
      .subscribe((data: any) => {
        this.commandes = data;
        this.noData = false;
        if(data.length < 1) this.noData = true;
        this.loader = false;
      }, err => {
        this.loader = false;
        this.noData = true;
      })
  }

}
