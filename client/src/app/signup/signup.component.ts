import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[SessionService]
})
export class SignupComponent implements OnInit {
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
    /*this.session.isLoggedIn()
       .subscribe(
         (user) => this.successCb(user)
       );*/
  }


   signup() {
     console.log(this.formInfo);
     this.session.signup(this.formInfo)
       .subscribe(
         (user) => this.successCb(user),
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

   getPrivateData() {
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
