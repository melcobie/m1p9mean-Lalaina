import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommandeService } from 'src/app/helper/commande-service';
import { fileUrl } from 'src/app/helper/util';
import { AppState } from 'src/app/reducer';
import { Commande } from 'src/app/reducer/user-reducer/type';

@Component({
  selector: 'app-commande-panier',
  templateUrl: './commande-panier.component.html',
  styleUrls: ['./commande-panier.component.scss']
})
export class CommandePanierComponent implements OnInit {
  fileUrl = fileUrl;

  commande: Commande = {
    plats: [],
    price: 0,
    costPrice: 0,
    etatLivraison: {
      delivered: false,
    }
  };
  addresse: string = "";

  constructor(
    private commandeService: CommandeService,
    private store: Store<AppState>,
  ) { 
    this.store.select("userState")
      .subscribe(user => this.commande = user.commande);
  }

  ngOnInit(): void {
  }

  handleChange(plat: any, event: any){
    let quantite = event.target.value > 0? event.target.value: 0;
    event.target.value = quantite;
    this.commandeService.ajouterPlat(plat, quantite);
    // plat.quantite = quantite;
  }

  delete(plat: any){
    this.commandeService.deletePlat(plat);
  }
  

  command(){
    if(this.addresse === ""){
      alert("Précisez votre addresse de livraison")
    }
    let commande = {
      ...this.commande,
      addresse: this.addresse,
    }
    this.commandeService.createCommande(
      commande,
      localStorage.getItem("token")||""
    ).subscribe(
      ()=>{
        this.commandeService.reset();
      }
    )
  }

}
