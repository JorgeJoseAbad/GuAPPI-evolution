import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  user: any;
   formInfo: Object = {
     username: '',
     password: ''
   };
   error: string = undefined;
   privateData: Object = undefined;
   logoutMessage : string = undefined;


  constructor(private session: SessionService) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (res) => { this.successCb(res.body) },
        (err) => { this.errorCb(err) }
      );
  }

  login() {
     this.session
       .login(this.formInfo)
       .subscribe(
         (res) => {
                    this.logoutMessage = undefined;
                    this.successCb(res.body);
          },
         (err) => this.errorCb(err)
       );
   }

   logout() {
     this.session.logout()
       .subscribe(
         (res) => {
                   this.privateData = undefined; //borrar los datos privados
                   this.logoutMessage = "User logout with " + res.body.message;
                   this.successCb(null)
         },
         (err) => this.errorCb(err)
       )
   }

   getPrivateData() {
     this.session.getPrivateData()
       .subscribe(
         (data) => {this.privateData = data.body},
         (err) => this.error = err
       );
   }

   errorCb(err) {
     this.error = err;
     this.user = null;
   }

   successCb(user) {
     this.user = user;
     this.error = null;
     console.log(this.user);
   }

}
