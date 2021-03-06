import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { DogService } from '../services/dog.service';
import { SessionService } from '../services/session.service';
import { KgartenService } from '../services/kgarten.service';

import { AgmMap, AgmMarker } from '@agm/core';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { MarkerManager } from '@agm/core';
import { AgmPolyline } from '@agm/core';

import { environment } from '../../environments/environment'


@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css'],
  providers: []
})

export class GooglemapComponent implements OnInit {
  title: string = 'Dogs Map';
  lat: number = 40.45;
  lng: number = -3.65500;
  dogs: any;
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

  logUser: any;
  userCoord = {
    lat: 9,
    lng: 9
  };

  theColor = "red";
  adoptedDogsCoordinates:Array<any> = [];
  traze: boolean = false;

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
    this.mapsAPILoader.load().then(() => {
      this.map = document.getElementById('map');
    })
  }

  mapAllDogs() {
    console.log("MAP ALL DOGS ESTE MAPA");
    console.log(this.map);
    this.dogService.getList().subscribe((response) => {
      this.dogs = response;
      //this.drawDogsInMap();
    })
  }

  private drawDogsInMap() {
    console.log(this.dogs);
    for (let i = 0; i < this.dogs.length; i++) {
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
        //map: this.map,
        title: this.dogs[i].dogName,
      });
    }

    this.title = "Dogs marked in map"

    //esto del navigator geolocation no debería ir aqui
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('center: ', center)
      }, function() { console.log('Error in the geolocation service.'); });
    } else {
      console.log('Browser does not support geolocation.');
    }

  }// function drawDogsInMap


  mapLogedUser() {
    this.session.isLoggedIn().subscribe((logUser) => {
      this.logUser = logUser.body;
      this.userCoord.lat = +this.logUser.latitude;
      this.userCoord.lng = +this.logUser.longitude;

      let image = {
        //url: 'https://maps.google.com/mapfiles/kml/pal2/icon1.png',
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        size: new google.maps.Size(40, 40),// This marker is 20 pixels wide by 32 pixels high.
        origin: new google.maps.Point(0, 0),// The origin for this image is (0, 0).
        anchor: new google.maps.Point(0, 30)// The anchor for this image is the base of the flagpole at (0, 32).
      };

      let marker = new google.maps.Marker({
        icon: image,
        position: this.userCoord,
        title: 'Hello World!',
        label: {
          text: 'im the owner'
        },
        animation: google.maps.Animation.DROP,
        draggable: true,

      });
      this.userMarker = marker;
      this.title = "Logged user marked in map"
    },
      (err) => {
        console.error(err);
        this.title = err;
      }
    )

  } // function mapLogedUser


  //retrieve router pair and logged user data
  trazeRoute() {
    this.mapLogedUser();
    this.routePair = this.kgarten.getRoute();
    this.session.isLoggedIn()
      .subscribe(
        (response) => {
          this.logUser = response.body;
          this.drawRoute(this.routePair, this.logUser);
          this.getAdoptedDogs(this.logUser); // new, to call all adopted dogs
        },
        (err) => console.log(err)
      )

  }

  /*This function must place two markers an trace a route between them*/
  drawRoute(routePair, logUser) {
    let  adoptedDogName: string = null;
    if (routePair && (routePair.userAdopt_id === logUser._id)) {
      this.session.get(this.routePair.userAdopt_id)
        .subscribe(
          (response) => {
            this.originUser = {
              lat: +response.body.latitude,
              lng: +response.body.longitude
            };
            this.pointA = new google.maps.LatLng(this.originUser.lat, this.originUser.lng);
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
              //map: this.map
            });
            console.log("en localizacion perro adoptado");
          },
          (err) => console.error(err)
        )

      this.dogService.get(this.routePair.dog_id)
        .subscribe(
          (response) => {
            adoptedDogName = response.body[0].dogName;
            this.destinationDog = {
              lat: +response.body[0].latitude,
              lng: +response.body[0].longitude
            };
            this.pointB = new google.maps.LatLng(this.destinationDog.lat, this.destinationDog.lng);
            let image = {
              //url: 'https://maps.google.com/mapfiles/kml/pal2/icon1.png',
              url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
              size: new google.maps.Size(40, 40),// This marker is 20 pixels wide by 32 pixels high.
              origin: new google.maps.Point(0, 0),// The origin for this image is (0, 0).
              anchor: new google.maps.Point(0, 30)// The anchor for this image is the base of the flagpole at (0, 32).
            };
            this.markerB = new google.maps.Marker({
              icon: image,
              position: this.pointB,
              title: "point B",
              label: "B",
              //map: this.map
            });
            this.title = "Last adoption route marked from " + logUser.username + " to " + adoptedDogName;

          },
          (err) => console.error(err)
        )

    } else {
      this.originUser = null;
      this.destinationDog = null
      console.warn("There is not new adoption by you, " + logUser.username);
      this.title = "There is not new adoption by you, " + logUser.username;
    }
  }

  /*new,get all adopted dogs and show routes"!!,
  methods for previously adopted dogs!! */
  getAdoptedDogs(user){

    this.adoptedDogsCoordinates = []; //reset, para evitar cargar los del usuario anterior
    this.traze = false; //reset, para evitar cargar datos anteirores


    this.kgarten.getList()
    .subscribe(
      (response)=>{
        console.log(response);
        this.selectUserAdoptedDogs(response.body,user);
      },
      (err)=>console.log(err)
    )
  }

  selectUserAdoptedDogs(listDogsAdopted,user){
    console.log("in selectUSerAdoptedDogs");
    console.log(user);
    console.log(listDogsAdopted);
    let userAdoptedDogs = listDogsAdopted.filter(function(dog){
      return dog.userAdopt_id === user._id});
    console.warn(userAdoptedDogs);
    this.getAdoptedDogsCoordinates(userAdoptedDogs,user);
  }

  getAdoptedDogsCoordinates(userAdoptedDogs,user){
    let userAdoptedDog;


    userAdoptedDogs.forEach(dog => {
      this.dogService.get(dog.dog_id)
        .subscribe(
          (response)=>{
            userAdoptedDog = {
              lat: +response.body[0].latitude,
              lng: +response.body[0].longitude
            };
           this.adoptedDogsCoordinates.push(userAdoptedDog);
          },
          (err)=>console.error(err)
        );

    });

      this.originUser = {
        lat: user.latitude,
        lng: user.longitude
      }

  }

  trazeToTrue(){

    this.traze = true;
    this.title = "These are your adopted routes, "+ this.logUser.username;
    console.warn(this.traze)
    console.log(this.originUser);
    console.log(this.adoptedDogsCoordinates)
  }

}
