import { Component, OnInit, Input } from '@angular/core';
import { DogComponent } from '../dog/dog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService} from '../services/dog.service';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader,AgmCoreModule } from 'angular2-google-maps/core';
import { FileUploader } from "ng2-file-upload";
import { SessionService} from '../services/session.service';



@Component({
  selector: 'app-newDog',
  templateUrl: './newDog.component.html',
  styleUrls: ['./newDog.component.css'],

})
export class NewDogComponent implements OnInit {
  @Input() any;

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/dog/`

  });

  user: any;
  username: string;


   newDog = {
      user_id: '',
      dogName: 'prueba ',
      breed: '',
      age: '',
      description: '',
      imgUrl: '',
      latitude: 6,
      longitude: 6
    };

   error: string;

   feedback: string;

     public latitude: number;
     public longitude: number;
     public searchControl: FormControl;
     public zoom: number;

     @ViewChild("search")
       public searchElementRef: ElementRef;

    constructor(
      private session: SessionService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private router: Router,

    ) {}

ngOnInit() {



    this.user=this.session.user;
    console.log(this.user);

    this.uploader.onSuccessItem = (item, response) => {
            this.feedback = JSON.parse(response).message;
          };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };



    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

        //create search FormControl
    this.searchControl = new FormControl();

        //set current position
    this.setCurrentPosition();

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
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          console.log(this.latitude);
          console.log(this.longitude);

        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("setCurrentPosition");
        console.log(position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }



//var origin_input = document.getElementById('origin-input');
//console.log(origin_input)
addDog() {

    this.uploader.onBuildItemForm = (item, form) => {

        form.append('user_id',this.session.user._id);
        form.append('dogName', this.newDog.dogName);
        form.append('breed', this.newDog.breed);
        form.append('age', this.newDog.age);
        form.append('description', this.newDog.description);
        form.append('latitude', this.latitude);
        form.append('longitude', this.longitude);
        console.log(form);
      };

      this.uploader.uploadAll();

    //this.formInfo.latitude=this.latitude;
    //this.formInfo.longitude=this.longitude;
    //this.uploader.uploadAll();

    console.log(this.newDog);

    /*this.session.newDog(this.newDog)
      .subscribe(
        (newDog) => this.successCb(newDog),
        (err) => this.errorCb(err)
      );*/
  }

  errorCb(err) {
    this.error = err;
    this.newDog = null;
  }

  successCb(newDog) {
    this.newDog = newDog;
    this.error = null;
  }

}
