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
   privateData: any;


  constructor(private router: Router,private session: SessionService) { }


  ngOnInit() {
      console.log("on init");


    this.session.isLoggedIn()
      .subscribe(
        (user) => {
                    console.log("PRUEBA eninit login: ",user);
                    this.successCb(user)
                  },
        (err) => {
                   console.log("PRUEBA en init login: ",err);
                   this.errorCb(err)
                 }
      );

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
         () => {
           this.privateData = undefined; //borrar los datos privados
           this.successCb(null)
         },
         (err) => this.errorCb(err)

       )
       console.log("in logout login component ts");
       console.log(this.user);
   }

   getPrivateData() {
     this.session.getPrivateData()
       .subscribe(
         (data) => this.privateData = data,
         (err) => this.error = err
       );
       console.log("this.privatedata o err: ")
       console.log(this.privateData);
       console.log(this.error);

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
