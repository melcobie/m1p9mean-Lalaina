import { Routes } from "@angular/router";
import { LivreurGuard } from "../guards/livreur-guard";
import { CommandeDetailsComponent } from "../screen/commande-details/commande-details.component";
import { CommandesComponent } from "../screen/commandes/commandes.component";

const livreurRoutes : Routes = [
    {
        path: "livreur/commande",
        component: CommandesComponent,
        canActivate: [LivreurGuard],
    },
    {
        path: "commande/:id",
        component: CommandeDetailsComponent,
        canActivate: [LivreurGuard],
    }
];

export default livreurRoutes;