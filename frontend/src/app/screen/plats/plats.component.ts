import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { PlatService } from 'src/app/helper/plat-service';
import { AppState } from 'src/app/reducer';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.scss']
})
export class PlatsComponent implements OnInit {
  restaurant: any;
  plats: any[] = [];
  loader: boolean = false;
  noData: boolean = false;
  recherche: string = "";
  creation: boolean = false;
  updateForm: boolean = false;

  new: any = {
    name: "",
    price: "",
    type: "",
  }
  up: any = {
    name: "",
    price: "",
    type: "",
  }
  error = "";
  errorUpdate = "";

  constructor(
    private service: PlatService,
    private store: Store<AppState>
  ) { 
    this.store.select("userState")
      .subscribe(u=>this.restaurant = u.user);
  }

  ngOnInit(): void {
    this.loader = true;
    this.service.getPlats({restaurants : this.restaurant._id}, localStorage.getItem("token")||"")
      .subscribe((data: any) => {
        this.plats = data;
        if(data.length < 1) this.noData = true;
        this.loader = false;
      }, err => {
        this.loader = false;
        this.noData = true;
      })
  }

  rechercher(){
    this.loader = true;
    this.service.getPlats({ 
      name: this.recherche,
      restaurants: this.restaurant._id,
    }, localStorage.getItem("token")||"")
    .subscribe((data: any) => {
      this.plats = data;
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
    this.service.deletePlat(id, localStorage.getItem("token")||"")
      .subscribe(()=>{
        this.plats = this.plats.filter((plat: any) => plat._id !== id);
        this.loader = false;
      }, err => {
        this.error = err.error.message;
        this.loader = false;
      })
  }

  update(id: any){
    let data: any = {};
    if(this.up.name !== "") data = { ...data, name: this.up.name };
    if(this.up.price !== "" && typeof(this.up.price) === 'number') data = { ...data, price: this.up.price};
    if(this.up.type !== "") data = { ...data, type: this.up.type };
    this.service.updatePlat(id, this.up, localStorage.getItem("token")||"")
      .subscribe((plat: any)=>{
        this.plats = this.plats.map((p: any) => p._id === plat._id? plat: p );
        this.loader = false;
        this.resetUpdate();
      }, err => {
        this.errorUpdate = err.error.message;
        this.loader = false;
      })
  }

  reset(){
    this.new = {
      name: "",
      price: "",
      type: "",
    };
    this.error = "";
    this.creation = false;
  }

  resetUpdate(){
    this.up = {
      name: "",
      price: "",
      type: "",
    };
    this.errorUpdate = "";
    this.updateForm = false;
  }

  create(){
    if(this.new.username === "" || this.new.password === "" || this.new.email === "" || this.new.location === "")
      this.error = "Complétez les champs";
    else{
      this.loader = true;
      let newPlat = {
        ...this.new,
        restaurant: this.restaurant,
      }
      this.service.createPlat(newPlat, localStorage.getItem("token")||"")
        .subscribe((data:any)=>{
          this.plats.push(data);
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
