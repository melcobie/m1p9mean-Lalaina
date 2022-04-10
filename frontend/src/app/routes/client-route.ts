import { Routes } from "@angular/router";
import { AdminGuard } from "../guards/admin-guard";
import { ClientGuard } from "../guards/client-guard";
import { CommandePanierComponent } from "../screen/commande-panier/commande-panier.component";
import { LivreursComponent } from "../screen/livreurs/livreurs.component";
import { MenuComponent } from "../screen/menu/menu.component";
import { RestaurantsComponent } from "../screen/restaurants/restaurants.component";

const clientRoutes : Routes = [
    {
        path: "order",
        component: MenuComponent,
        canActivate: [ClientGuard],
    },
    {
        path: "command",
        component: CommandePanierComponent,
        canActivate: [ClientGuard],
    }
];

export default clientRoutes;