import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { type } from 'src/app/reducer/user-reducer/action';
import { EKalyStore } from 'src/app/reducer/user-reducer/type';
import { AppState } from 'src/app/reducer';
import { AuthenticationService } from 'src/app/helper/authentication-service';

export const userType = {
  OFF: "",
  CLIENT: "ROLE_CLIENT",
  ADMIN: "ROLE_ADMIN",
  RESTAURANT: "ROLE_RESTAURANT",
  LIVREUR: "ROLE_LIVREUR",
}

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user: Observable<EKalyStore>;
  accessToken: string = "";
  userType: any = userType;
  type: string = userType.CLIENT;

  constructor(private route: Router,
    private store: Store<AppState>,
    private service: AuthenticationService,
  ) { 
    this.user = this.store.select("userState");
    this.user.subscribe((u)=>{
      this.accessToken = u.accessToken;
      this.type = u?.user? u?.user?.type?.identifier : userType.CLIENT;
    });
  }

  ngOnInit(): void {
   
  }

  goToUrl(url: string): void{
    this.route.navigateByUrl(url);
  }

  async logout(){
      this.service.logout(this.accessToken, (data:any)=>{});
      this.store.dispatch({type: type.SIGNOUT, payload:""})
      localStorage.clear();
      this.goToUrl("/");  
  }

}
