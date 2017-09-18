import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  user: any;
   formInfo = {
     username: '',
     password: '',
     email: '',
     address: ''
   };
   error: string;
   privateData: any = '';


  constructor(private router: Router,private session: SessionService) { }


  ngOnInit() {
      console.log("on init");
      /*this.session.isLoggedIn()
         .subscribe(
           (user) => this.successCb(user),
           (err) => this.errorCb(err)
         );*/
  }

  login() {
     console.log(this.formInfo);
     console.log(this.formInfo.username);
     this.session
       .login(this.formInfo)
       .subscribe(
         (user) => {this.successCb(user);
                    console.log(user)},
         (err) => this.errorCb(err)
       );
   }

   logout() {
     this.session.logout()
       .subscribe(
         () => this.successCb(null),
         (err) => this.errorCb(err)
       );
   }

   getPrivateData(user) {
     console.log(user);
     this.session.getPrivateData()
       .subscribe(
         (data) => this.privateData = data,
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
   }

}
