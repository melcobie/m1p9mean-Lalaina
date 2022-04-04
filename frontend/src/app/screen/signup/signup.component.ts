import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/helper/authentication-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username: string = "";
  password: string = "123456";
  password2: string = "";
  email: string = "";
  error: string = "";
  loader: boolean = false;
  
  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
  }

  checkPassword(): boolean{
    return this.password === this.password2;
  }

  cb(result:any): any {
    console.log(result);
  }

  async connect(){
    if(this.username==="" || this.password==="" ||this.email===""){
      this.error = "Veuillez complétez tous les champs";
      return;
    }
    if(!this.checkPassword()){
      this.error = "Les mots de passe ne correspondent pas";
      return;
    }
    this.loader = true;
    const data = {username: this.username, password: this.password, email: this.email};
    this.service.signup(data, (result:any)=>{
      this.cb(result);
      this.loader = false;
    }, (err:any)=>{
      this.error = err.error.message;
      this.loader = false;
    });
  }

}
