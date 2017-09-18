import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { DogService } from '../services/dog.service';
import { MapsAPILoader,AgmCoreModule } from 'angular2-google-maps/core';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

import {environment} from '../../environments/environment'

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
  @ViewChild("search")
  public searchElementRef: ElementRef
  dogMarker;
  coordPerro;

  constructor(
    private dogService: DogService,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit() {
    //this.dogService.getList().subscribe((dogs)=> this.dogs = dogs )
  }

  log(){

  this.dogService.getList().subscribe((dogs)=> this.dogs = dogs )
    //ahora esta funcion log solo sirve para sacar datos por consola

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
      /*  var map = new google.maps.Map(document.getElementById('map'), {
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
      }

}
