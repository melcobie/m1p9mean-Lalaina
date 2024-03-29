import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './screen/welcome/welcome.component';
import { HeaderComponent } from './widget/header/header.component';
import { FooterComponent } from './widget/footer/footer.component';
import { SigninComponent } from './screen/signin/signin.component';
import { SignupComponent } from './screen/signup/signup.component';
import { LoaderComponent } from './widget/loader/loader.component';
import { reducers } from './reducer';
import { HeaderClientComponent } from './widget/header/header-client/header-client.component';
import { HeaderAdminComponent } from './widget/header/header-admin/header-admin.component';
import { HeaderRestaurantComponent } from './widget/header/header-restaurant/header-restaurant.component';
import { HeaderLivreurComponent } from './widget/header/header-livreur/header-livreur.component';
import { RestaurantsComponent } from './screen/restaurants/restaurants.component';
import { LivreursComponent } from './screen/livreurs/livreurs.component';
import { PlatsComponent } from './screen/plats/plats.component';
import { MenuComponent } from './screen/menu/menu.component';
import { PlatComponent } from './screen/components/plat/plat.component';
import { CommandePanierComponent } from './screen/commande-panier/commande-panier.component';
import { CommandesComponent } from './screen/commandes/commandes.component';
import { CommandeDetailsComponent } from './screen/commande-details/commande-details.component';
import { CommandeRestaurantComponent } from './screen/commande-restaurant/commande-restaurant.component';
import { BeneficeRestaurantComponent } from './screen/benefice-restaurant/benefice-restaurant.component';
import { CommandeGlobaleComponent } from './screen/commande-globale/commande-globale.component';
import { BeneficeComponent } from './screen/benefice/benefice.component';
import { NotAuthorizedComponent } from './screen/not-authorized/not-authorized.component';
import { ErrorCatchingInterceptor } from './helper/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    LoaderComponent,
    HeaderClientComponent,
    HeaderAdminComponent,
    HeaderRestaurantComponent,
    HeaderLivreurComponent,
    RestaurantsComponent,
    LivreursComponent,
    PlatsComponent,
    MenuComponent,
    PlatComponent,
    CommandePanierComponent,
    CommandesComponent,
    CommandeDetailsComponent,
    CommandeRestaurantComponent,
    BeneficeRestaurantComponent,
    CommandeGlobaleComponent,
    BeneficeComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorCatchingInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
