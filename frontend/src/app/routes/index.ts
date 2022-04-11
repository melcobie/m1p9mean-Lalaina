import { Routes } from "@angular/router";
import { NotAuthorizedComponent } from "../screen/not-authorized/not-authorized.component";
import { SigninComponent } from "../screen/signin/signin.component";
import { SignupComponent } from "../screen/signup/signup.component";
import { WelcomeComponent } from "../screen/welcome/welcome.component";
import adminRoutes from "./admin-routes";
import clientRoutes from "./client-route";
import livreurRoutes from "./livreur-routes";
import restaurantRoutes from "./restaurant-routes";

const routes : Routes = [
    {
        path: "",
        component: WelcomeComponent,
    },
    {
        path: "signin",
        component: SigninComponent,
    },
    {
        path: "signup",
        component: SignupComponent,
    },
    ...adminRoutes,
    ...restaurantRoutes,
    ...clientRoutes,
    ...livreurRoutes,
    {
        path: "not-authorized",
        component: NotAuthorizedComponent,
    },
    {
        path: "*",
        redirectTo: "",
    }
];

export default routes;