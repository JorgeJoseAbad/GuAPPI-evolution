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
   error: string;
   privateData: Object = undefined;


  constructor(private session: SessionService) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (user) => { this.successCb(user) },
        (err) => { this.errorCb(err) }
      );
  }

  login() {
     this.session
       .login(this.formInfo)
       .subscribe(
         (res) => {this.successCb(res.body);
                    console.log(res)},
         (err) => this.errorCb(err)
       );
   }

   logout() {
     this.session.logout()
       .subscribe(
         () => {
           this.privateData = undefined; //borrar los datos privados
           this.successCb(null)
         },
         (err) => this.errorCb(err)
       )
   }

   getPrivateData() {
     this.session.getPrivateData()
       .subscribe(
         (data) => {this.privateData = data},
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
