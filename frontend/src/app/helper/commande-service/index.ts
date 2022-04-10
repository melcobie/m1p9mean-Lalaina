import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducer";
import { type } from "src/app/reducer/user-reducer/action";
import { Commande } from "src/app/reducer/user-reducer/type";
import { Service } from "../api";
import { url } from "../url";

@Injectable({
    providedIn: "root",
})
export class CommandeService{
    constructor(
        private store: Store<AppState>,
        private service: Service,
    ){}

    createCommande = (commande: Commande, token: string) => {
        return this.service.postData(
            url.commande.new,
            token,
            commande
        );
    }

    ajouterCommande = (plat: any, number: number) => {
        let platCommande = {
            plat, 
            quantite: number,
            price: plat.price * number,
            costPrice: plat.costPrice * number,
        };
        let state;
        console.log(platCommande);
        this.store.select("userState")
            .subscribe(user => {
                let commande = user.commande;
                state = commande.plats.find(plat => plat.plat._id === platCommande.plat._id)
                    ? this.add(commande, platCommande)
                    : this.push(commande, platCommande);
            })
        this.store.dispatch({type: type.ADD, payload:state})
    }

    add = (commande: any, platCommande: any) => {

        let plats = commande.plats.map( (plat: any) => {
            if(plat.plat._id === platCommande.plat._id) return {
                ...plat,
                quantite: plat.quantite + platCommande.quantite,
                price: plat.price + platCommande.price,
                costPrice: plat.costPrice + platCommande.costPrice,
            }
            else return plat;
        });
        console.log(plats);
        return {
            plats,
            price: commande.price + platCommande.price,
            costPrice: commande.costPrice + platCommande.costPrice,
        }
    }

    push = (commande: any, platCommande: any) => {
        return {
            plats: [...commande.plats, platCommande],
            price: commande.price + platCommande.price,
            costPrice: commande.costPrice + platCommande.costPrice,
        }
    }

    getQuantiteInOrder = (plat: any) => {
        let quantite = 0;
        this.store.select("userState")
            .subscribe(user => {
                let commande = user.commande;
                quantite = commande.plats.filter(p => plat._id === p.plat._id)?.[0]?.quantite;
                return quantite;
            })
        return quantite;
    }

    ajouterPlat = (plat: any, number: number) => {
        let inStock: number = this.getQuantiteInOrder(plat);
        let quantite = number - inStock;
        return this.ajouterCommande(plat, quantite);
    }

    deletePlat = (plat: any) => {
        let inStock = this.getQuantiteInOrder(plat);
        return this.ajouterCommande(plat, - inStock);
    }

    reset = () => {
        this.store.dispatch({type: type.DELETE, payload:{}})
    }
}

