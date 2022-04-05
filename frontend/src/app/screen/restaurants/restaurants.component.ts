import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantService } from 'src/app/helper/restaurant-service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  loader: boolean = false;
  noData: boolean = false;
  recherche: string = "";
  creation: boolean = false;

  new: any = {
    username: "",
    password: "",
    email: "",
    location: "",
  }
  error = "";

  constructor(
    private service: RestaurantService
  ) { 
    
  }

  ngOnInit(): void {
    this.loader = true;
    this.service.getRestaurant({})
      .subscribe((data: any) => {
        this.restaurants = data;
        if(data.length < 1) this.noData = true;
        this.loader = false;
      }, err => {
        this.loader = false;
        this.noData = true;
      })
  }

  rechercher(){
    this.loader = true;
    this.service.getRestaurant({ name: this.recherche })
    .subscribe((data: any) => {
      this.restaurants = data;
      this.noData = false;
      if(data.length < 1) this.noData = true;
      this.loader = false;
    }, err => {
      this.loader = false;
      this.noData = true;
    })
  }

  annuler(){
    this.recherche = "";
    this.rechercher();
  }

  delete(id: any){
    this.loader = true;
    this.service.deleteRestaurant({id}, localStorage.getItem("token")||"")
      .subscribe(()=>{
        this.restaurants = this.restaurants.filter((restaurant: any) => restaurant._id !== id);
        this.loader = false;
      }, err => {
        this.loader = false
      })
  }

  reset(){
    this.new = {
      username: "",
      password: "",
      email: "",
      location: "",
    };
    this.creation = false;
  }

  create(){
    if(this.new.username === "" || this.new.password === "" || this.new.email === "" || this.new.location === "")
      this.error = "Complétez les champs";
    else{
      this.loader = true;
      this.service.createRestaurant(this.new, localStorage.getItem("token")||"")
        .subscribe((data:any)=>{
          this.restaurants.push(data);
          this.loader = false;
          this.noData = false;
          this.reset();
        }, err => {
          this.error = err.error.message;
          this.loader = false;
        })
    }
  }

}
