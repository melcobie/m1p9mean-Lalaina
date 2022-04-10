import { Component, OnInit } from '@angular/core';
import { PlatService } from 'src/app/helper/plat-service';
import { RestaurantService } from 'src/app/helper/restaurant-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  restaurants: any[] = [];
  restaurantsSelected: string[] = [];

  plats: any[] = [];
  
  loader: boolean = false;

  recherche: any = {
    name: "",
    type: "",
    min: "",
    max: "",
  }

  constructor(
    private restaurantService: RestaurantService,
    private platService: PlatService,
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.restaurantService.getRestaurant({})
      .subscribe((data: any) => {
        this.restaurants = data;
      });
    this.getPlats();
  }

  handleClick(id: string){
    this.restaurantsSelected?.find(r => r === id)
      ? this.restaurantsSelected = this.restaurantsSelected.filter(r => r !== id)
      : this.restaurantsSelected.push(id);
  }

  getRestaurantActive(id: string){
    return this.restaurantsSelected.find(r => r === id);
  }

  getPlats(){
    this.loader = true;
    let filter = {
      ...this.recherche,
      restaurants: this.restaurantsSelected.join().trim(),
    }
    this.platService.getPlats(filter, localStorage.getItem("token")||"")
      .subscribe((data: any) => {
        this.plats = data;
        this.loader = false;
      });
  }

  reset(){
    this.recherche = {
      name: "",
      type: "",
      min: "",
      max: "",
    };
    this.restaurantsSelected = [];
    this.getPlats();
  }

  filter(){
    this.recherche = {
      name: "",
      type: "",
      min: "",
      max: "",
    };
    this.getPlats();
  }

  rechercher(){
    this.getPlats();
  }

}
