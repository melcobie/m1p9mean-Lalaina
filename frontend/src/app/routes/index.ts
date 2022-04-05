import { Routes } from "@angular/router";
import { SigninComponent } from "../screen/signin/signin.component";
import { SignupComponent } from "../screen/signup/signup.component";
import { WelcomeComponent } from "../screen/welcome/welcome.component";
import adminRoutes from "./admin-routes";

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
    {
        path: "*",
        redirectTo: "",
    }
];

export default routes;