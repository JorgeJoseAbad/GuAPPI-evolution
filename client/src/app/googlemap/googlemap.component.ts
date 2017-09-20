import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { DogService } from '../services/dog.service';
import { SessionService} from '../services/session.service';
//import { MapsAPILoader,AgmCoreModule } from 'angular2-google-maps/core';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';


import { AgmMap, AgmMarker } from '@agm/core';
import { MapsAPILoader,AgmCoreModule } from '@agm/core';
import {environment} from '../../environments/environment'

import { } from 'googlemaps';



@Component({
  selector: 'app-googlemap',

  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})


export class GooglemapComponent implements OnInit {
  title: string = 'Dogs Map';
  lat: number = 40.45;
  lng: number = -3.65500;
  dogs = [];
  map;

  logUser:any;
  userCoord={
    lat:9,
    lng:9
  };


  @ViewChild("search")
  public searchElementRef: ElementRef
  dogMarker;
  coordPerro;
  userMarker;

  constructor(
    private dogService: DogService,
    private mapsAPILoader: MapsAPILoader,
    private session: SessionService
  ) { }

  ngOnInit() {
    //this.dogService.getList().subscribe((dogs)=> this.dogs = dogs )
  }

  mapAllDogs(){

  this.dogService.getList().subscribe((dogs)=> this.dogs = dogs )
    //ahora esta funcion mapAllDogs de aqui para abajo solo sirve para sacar datos por consola

    console.log(this.dogs);
     for (let i=0;i< this.dogs.length;i++){

        console.log(this.dogs[i].latitude);
        console.log(this.dogs[i].longitude);
        let latit=this.dogs[i].latitude;
        let longit=this.dogs[i].longitude
        let coordPerro = {
          lat: this.dogs[i].latitude,
          lng: this.dogs[i].longitude
        };
        /*var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: coordPerro
          });
*/
        console.log(coordPerro.lat);
        console.log(coordPerro.lng);
        let dogMarker = new google.maps.Marker({
            position: {
              lat: coordPerro.lat,
              lng: coordPerro.lng,
            },
            map: this.map,
            title: this.dogs[i].dogName,
          });
          console.log(dogMarker);
          console.log(this.map);
        dogMarker.setMap(this.map);
    }

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

              const center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              console.log('center: ', center)

            }, function () {

              console.log('Error in the geolocation service.');
            });
          } else {

            console.log('Browser does not support geolocation.');
          }
      }// function mapAllDogs


  mapLogedUser(){

    this.session.get(this.session.user._id).subscribe((logUser)=> {
          this.logUser = logUser;
          console.log(this.logUser);
          console.log("in mapLogedUser dentro del get subscribe");
          this.userCoord.lat=+this.session.user.latitude;
          this.userCoord.lng=+this.session.user.longitude;
          console.log(this.session.user);
          console.log("user coords: ");
          console.log(this.userCoord);
          console.log(this.map);

          let image = {
            //url: 'https://maps.google.com/mapfiles/kml/pal2/icon1.png',
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            size: new google.maps.Size(40, 40),// This marker is 20 pixels wide by 32 pixels high.
            origin: new google.maps.Point(0, 0),// The origin for this image is (0, 0).
            anchor: new google.maps.Point(0, 30)// The anchor for this image is the base of the flagpole at (0, 32).
          };

          let marker = new google.maps.Marker({
                    icon: image,  //pongo icono segun variable image
                    //este icon con path a simbolo predefinido

                    position: this.userCoord,

                    map: this.map,
                    title: 'Hello World!',
                    //anyado label
                    label:{
                      text: 'im here at Australia'
                    },
                    //anyado animacion
                    animation: google.maps.Animation.DROP,
                    draggable: true,

                  });
          this.userMarker=marker;
          console.log(marker);
          console.log(this.userMarker);
          console.log(this.map);
          marker.setMap(this.map);

      })

    } // function mapLogedUser

}
