import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { type } from 'src/app/reducer/action';
import { EKalyStore } from 'src/app/reducer/type';

interface AppStore{
  state : EKalyStore
}

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user: Observable<EKalyStore>;

  constructor(private route: Router,
    private store: Store<AppStore>
  ) { 
    this.user = this.store.select("state");
  }

  ngOnInit(): void {
   
  }

  goToUrl(url: string): void{
    this.route.navigateByUrl(url);
  }

  logout():void{
    this.store.dispatch({type: type.SIGNOUT, payload:""})
    this.goToUrl("/");
  }

}
