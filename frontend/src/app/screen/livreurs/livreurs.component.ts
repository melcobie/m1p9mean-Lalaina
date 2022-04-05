import { Component, OnInit } from '@angular/core';
import { LivreurService } from 'src/app/helper/livreur-service';

@Component({
  selector: 'app-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent implements OnInit {
  livreurs: any[] = [];
  loader: boolean = false;
  noData: boolean = false;
  recherche: string = "";
  creation: boolean = false;

  new: any = {
    username: "",
    password: "",
    email: "",
  }
  error = "";

  constructor(
    private service: LivreurService
  ) { 
    
  }

  ngOnInit(): void {
    this.loader = true;
    this.service.getLivreur({})
      .subscribe((data: any) => {
        this.livreurs = data;
        if(data.length < 1) this.noData = true;
        this.loader = false;
      }, err => {
        this.loader = false;
        this.noData = true;
      })
  }

  rechercher(){
    this.loader = true;
    this.service.getLivreur({ name: this.recherche })
    .subscribe((data: any) => {
      this.livreurs = data;
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
    this.service.deleteLivreur({id}, localStorage.getItem("token")||"")
      .subscribe(()=>{
        this.livreurs = this.livreurs.filter((livreur: any) => livreur._id !== id);
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
    };
    this.creation = false;
  }

  create(){
    if(this.new.username === "" || this.new.password === "" || this.new.email === "" || this.new.location === "")
      this.error = "Complétez les champs";
    else{
      this.loader = true;
      this.service.createLivreur(this.new, localStorage.getItem("token")||"")
        .subscribe((data:any)=>{
          this.livreurs.push(data);
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
