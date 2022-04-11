import { Injectable } from "@angular/core";
import { Service } from "../api";
import { url } from "../url";

@Injectable({
    providedIn: "root",
})
export class BeneficeService{
    constructor(
        private service: Service,
    ){}

    beneficeRestaurant = (idRestaurant: string, token: string = "") => {
        return this.service.getData(
            url.benefice.restaurant,
            token,
            { idRestaurant }
        );
    }

    beneficeParJour = (token: string = "") => {
        return this.service.getData(
            url.benefice.daily,
            token
        )
    }

    beneficeParRestaurant = (token: string = "") => {
        return this.service.getData(
            url.benefice.restaurant,
            token
        )
    }
}