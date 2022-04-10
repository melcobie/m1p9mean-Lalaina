import { Routes } from "@angular/router";
import { ClientGuard } from "../guards/client-guard";
import { CommandePanierComponent } from "../screen/commande-panier/commande-panier.component";
import { MenuComponent } from "../screen/menu/menu.component";

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