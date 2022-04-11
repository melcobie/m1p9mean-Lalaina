import { Routes } from "@angular/router";
import { AdminGuard } from "../guards/admin-guard";
import { BeneficeComponent } from "../screen/benefice/benefice.component";
import { CommandeGlobaleComponent } from "../screen/commande-globale/commande-globale.component";
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
    },{
        path: "commande/all",
        component: CommandeGlobaleComponent,
        canActivate: [AdminGuard],
    },{
        path: "benefice/all",
        component: BeneficeComponent,
        canActivate: [AdminGuard],
    }
];

export default adminRoutes;