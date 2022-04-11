import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/helper/authentication-service';
import { AppState } from 'src/app/reducer';
import { type } from 'src/app/reducer/user-reducer/action';
import { EKalyStore } from 'src/app/reducer/user-reducer/type';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  username: string = "ekaly.lalaina@gmail.com";
  password: string = "123456";
  error: string = "";
  loader: boolean = false;

  constructor(private service: AuthenticationService,
    private store : Store<AppState>,
    private router : Router,
  ) { }

  ngOnInit(): void {
  }

  cb(result: any){
    localStorage.setItem("token", result.accessToken);
    this.store.dispatch({type:type.SIGNIN, payload:result});
    this.router.navigateByUrl("/");
  }

  cbError(err: any){
    console.log(err);
    // this.error = err.message;
  }

  async connect() {
    this.loader = true;
    const data = {username: this.username, password: this.password};
    // this.store.dispatch({type:type.SIGNIN, payload: data})
    this.service.signin(data, (result:any)=>{
      this.cb(result);
      this.loader = false;
    }, (err:any)=>{
      this.error = err.error.message;
      this.loader = false;
    });
  }

}
