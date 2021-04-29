import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { NgModel } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader} from '@agm/core';

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
     address: '',
     longitude: 9,
     latitude: 9
   };
   error: string;
   privateData: any = '';

   public searchControl: FormControl;

   @ViewChild("search")
     public searchElementRef: ElementRef;

  constructor(
    private session: SessionService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    /*this.session.isLoggedIn()
       .subscribe(
         (user) => this.successCb(user)
       );*/

     this.searchControl = new FormControl();

       //load Places Autocomplete
       this.mapsAPILoader.load().then(() => {
         let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
           types: ["address"]
         });
         autocomplete.addListener("place_changed", () => {
           this.ngZone.run(() => {
             //get the place result
             let place: google.maps.places.PlaceResult = autocomplete.getPlace();

             //verify result
             if (place.geometry === undefined || place.geometry === null) {
               return;
             }
             //set latitude, longitude and zoom
             this.formInfo.latitude = place.geometry.location.lat();
             this.formInfo.longitude = place.geometry.location.lng();

           });
         });
       });
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
         () => {
           this.privateData = undefined;
           this.successCb(null)
         },
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
