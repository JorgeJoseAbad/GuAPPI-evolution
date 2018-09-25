import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { DogService } from '../services/dog.service';
import { SessionService} from '../services/session.service';
import { KgartenService} from '../services/kgarten.service';
//import { MapsAPILoader,AgmCoreModule } from 'angular2-google-maps/core';
//import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

import { AgmMap, AgmMarker } from '@agm/core';
import { MapsAPILoader,AgmCoreModule } from '@agm/core';
import { MarkerManager} from '@agm/core';
import { AgmPolyline} from '@agm/core';


import { environment} from '../../environments/environment'



@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css'],
  providers:[]
})


export class GooglemapComponent implements OnInit {
  title: string = 'Dogs Map';
  lat: number = 40.45;
  lng: number = -3.65500;
  dogs = [];

  map;
  routePair;
  destinationDog;
  originUser;
  directionsService;
  directionsDisplay;
  pointA;
  pointB;
  markerA;
  markerB;


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
  travelMode;

  constructor(
    private dogService: DogService,
    private mapsAPILoader: MapsAPILoader,
    private session: SessionService,
    private kgarten: KgartenService,

  ) { }

  ngOnInit() {
        console.log("in NGONINIT");
        this.initMap();

  }

/*function initMap en este momento no opertiva*/
  initMap() {
      console.log("THIS IS THIS MAP UP");
      console.log(document.getElementById('map'));
      //this.map=document.getElementById('map');
      console.log("THIS IS THIS MAP DOWN");
  }


  mapAllDogs(){
  console.log("MAP ALL DOGS ESTE MAPA");
  console.log(this.map);
  this.dogService.getList().subscribe((dogs)=> {this.dogs = dogs;
    //ahora esta funcion mapAllDogs de aqui para abajo solo sirve para sacar datos por consola

    console.log(this.dogs);
     for (let i=0;i< this.dogs.length;i++){

        let latit=this.dogs[i].latitude;
        let longit=this.dogs[i].longitude
        let coordPerro = {
          lat: this.dogs[i].latitude,
          lng: this.dogs[i].longitude
        };

        console.log(coordPerro);

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

    }
  })

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
          this.userCoord.lat=+this.logUser.latitude;
          this.userCoord.lng=+this.logUser.longitude;
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
                      text: 'im the owner'
                    },
                    //anyado animacion
                    animation: google.maps.Animation.DROP,
                    draggable: true,

                  });
          this.userMarker=marker;
          console.log(marker);
          console.log(this.userMarker);
          console.log(this.map);

      })

    } // function mapLogedUser

/*This function must place two markers an trace a route between them*/
trazeRoute(){
    console.log("IN TRAZE ROUTE");
    console.log(this.map);
    this.routePair=this.kgarten.getRoute();
    console.log("this route pair es");
    console.log(this.routePair);

    this.session.get(this.routePair.userAdopt_id).subscribe((adoptUser)=> {
      console.log(adoptUser.username); //OK
        this.originUser={
          lat: +adoptUser.latitude,
          lng: +adoptUser.longitude
        }
      })
    this.dogService.get(this.routePair.dog_id).subscribe((dogAdopted)=>{
        console.log(dogAdopted[0].dogName); //OK
          this.destinationDog={
            lat: +dogAdopted[0].latitude,
            lng: +dogAdopted[0].longitude
          }
        })
    console.log(this.originUser); //OK
    console.log(this.destinationDog); //OK

    this.pointA=new google.maps.LatLng(this.originUser.lat,this.originUser.lng);
    this.pointB=new google.maps.LatLng(this.destinationDog.lat,this.destinationDog.lng);
    console.log(this.originUser,this.destinationDog); //OK
    console.log(this.pointA.lat(),this.pointA.lng());  //OK
    console.log(this.pointB.lat(),this.pointB.lng()); // OK

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    console.log(this.directionsService);
    console.log(this.directionsDisplay);
    //this.directionsDisplay.setMap(this.map);

    let image = {
        //url: 'https://maps.google.com/mapfiles/kml/pal2/icon1.png',
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        size: new google.maps.Size(40, 40),// This marker is 20 pixels wide by 32 pixels high.
        origin: new google.maps.Point(0, 0),// The origin for this image is (0, 0).
        anchor: new google.maps.Point(0, 30)// The anchor for this image is the base of the flagpole at (0, 32).
    };
    this.markerA = new google.maps.Marker({
      icon: image,
      position: this.pointA,
      title: "point A",
      label: "A",
      map: this.map //UNDEFINED
    }),
    this.markerB = new google.maps.Marker({
      icon: image,
      position: this.pointB,
      title: "point B",
      label: "B",
      map: this.map //UNDEFINED
    }),
    console.log(this.markerA); //OK
    console.log(this.markerB); //OK
    console.log(this.pointA);
    console.log(this.pointB);

    this.directionsService.route({
            origin: this.pointA,
            destination: this.pointB,
            travelMode: 'TRANSIT'
          }, function(response, status) {
            if (status==='OK') {
              this.directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });

        }

}


  /*te haces un ts con variables estáticas y te las importas

pero ojo con eso que si muchos acceden a esas variables te pueden cambiarlas cuando no quieres
Ejemplo un ts communicationAmongComponents.ts
export class CommunicationsAmongComponents { static aburrido = [aburr1, aburr2,aburr3];
luego lo importas en el ts que quieras usarlo y voila
puedes usarlo en varios ts
una solución de andar por casa*/
