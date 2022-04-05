import { Routes } from "@angular/router";
import { AdminGuard } from "../guards/admin-guard";
import { LivreursComponent } from "../screen/livreurs/livreurs.component";
import { RestaurantsComponent } from "../screen/restaurants/restaurants.component";

const adminRoutes : Routes = [
    {
        path: "restaurants",
        component: RestaurantsComponent,
        canActivate: [AdminGuard],
    },{
        path: "livreurs",
        component: LivreursComponent,
        canActivate: [AdminGuard],
    }
];

export default adminRoutes;