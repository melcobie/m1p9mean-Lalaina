import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username: string = "";
  password: string = "123456";
  password2: string = "";
  error: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

  checkPassword(): boolean{
    return this.password === this.password2;
  }

  connect(): void{
    this.checkPassword()
      ? this.error = ""
      : this.error = "Les mots de passe ne correspondent pas";
  }

}
