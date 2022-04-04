import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/helper/authentication-service';
import { type } from 'src/app/reducer/action';
import { EKalyStore } from 'src/app/reducer/type';

interface AppStore{
  user : EKalyStore
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  username: string = "";
  password: string = "123456";
  error: string = "";
  loader: boolean = false;

  constructor(private service: AuthenticationService,
    private store : Store<AppStore>
  ) { }

  ngOnInit(): void {
  }

  cb(result: any){
    this.store.dispatch({type:type.SIGNIN, payload:result})
  }

  cbError(err: any){
    console.log(err);
    // this.error = err.message;
  }

  async connect() {
    this.loader = true;
    const data = {username: this.username, password: this.password};
    this.store.dispatch({type:type.SIGNIN, payload: data})
    this.loader = false;
    // this.service.signin(data, (result:any)=>{
    //   this.cb(result);
    //   this.loader = false;
    // }, (err:any)=>{
    //   this.error = err.error.message;
    //   this.loader = false;
    // });
  }

}
