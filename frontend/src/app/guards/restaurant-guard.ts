import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducer";
import { initialState } from "../reducer/user-reducer/reducer";
import { EKalyStore } from "../reducer/user-reducer/type";
import { userType } from "../widget/header/header.component";

@Injectable({
    providedIn: 'root'
})
export class RestaurantGuard implements CanActivate{
    user: EKalyStore = initialState;

    constructor(private store: Store<AppState>
        , private router: Router
    ) {
        this.store.select("userState").subscribe(u => this.user = u);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.user?.user?.type?.identifier === userType.RESTAURANT) return true;
        this.router.navigateByUrl("/signin");
        return false;
    }
}