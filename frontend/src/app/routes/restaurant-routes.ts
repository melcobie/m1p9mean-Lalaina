import { Routes } from "@angular/router";
import { RestaurantGuard } from "../guards/restaurant-guard";
import { BeneficeRestaurantComponent } from "../screen/benefice-restaurant/benefice-restaurant.component";
import { CommandeRestaurantComponent } from "../screen/commande-restaurant/commande-restaurant.component";
import { PlatsComponent } from "../screen/plats/plats.component";

const restaurantRoutes : Routes = [
    {
        path: "plats",
        component: PlatsComponent,
        canActivate: [RestaurantGuard],
    },
    {
        path: "restaurant/commande",
        component: CommandeRestaurantComponent,
        canActivate:[RestaurantGuard],
    },
    {
        path: "restaurant/benefice",
        component: BeneficeRestaurantComponent,
        canActivate: [RestaurantGuard],
    }
];

export default restaurantRoutes;