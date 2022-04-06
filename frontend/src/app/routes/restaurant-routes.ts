import { Routes } from "@angular/router";
import { RestaurantGuard } from "../guards/restaurant-guard";
import { PlatsComponent } from "../screen/plats/plats.component";

const restaurantRoutes : Routes = [
    {
        path: "plats",
        component: PlatsComponent,
        canActivate: [RestaurantGuard],
    },
];

export default restaurantRoutes;