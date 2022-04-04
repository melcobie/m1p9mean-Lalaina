import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './screen/welcome/welcome.component';
import { HeaderComponent } from './widget/header/header.component';
import { FooterComponent } from './widget/footer/footer.component';
import { SigninComponent } from './screen/signin/signin.component';
import { SignupComponent } from './screen/signup/signup.component';
import { userReducer } from './reducer/reducer';
import { LoaderComponent } from './widget/loader/loader.component';
import { simplereducer } from './reducer/simple-reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      message : simplereducer,
      user : userReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
