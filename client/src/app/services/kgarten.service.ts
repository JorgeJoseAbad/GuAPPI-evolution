import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';



@Injectable()
export class KgartenService {
  //BASE_URL: string = 'http://localhost:3000';
  BASE_URL: string =environment.apiUrl;
  routePair;
  constructor(private http: Http) { }


    getList() {
      console.log("en getlist kgarten service");
      return this.http.get(`${this.BASE_URL}/api/kgarten`)
        .map((res) => res.json());
    }

    get(id) {
      return this.http.get(`${this.BASE_URL}/api/kgarten/${id}`)
        .map((res) => res.json());
    }

    add(dogKgarten) {
      console.log(dogKgarten);
      return this.http.post(`${this.BASE_URL}/api/kgarten`,dogKgarten)
        .map((res)=> res.json());
    }

    edit(dogKgarten,updatedPet) {
      console.log(dogKgarten,updatedPet);
      return this.http.put(`${this.BASE_URL}/api/kgarten/${dogKgarten}`, updatedPet)
        .map((res) => res.json());
    }

    delete(id) {
      console.log(id);
      return this.http.delete(`${this.BASE_URL}/api/kgarten/${id}`)
        .map((res) => res.json());

        //.catch(this.handleError);
    }

   /*receive the pet adopted from kgartenchield component*/
    traceRoute(pet){
      console.log("in kartenservice trazeRoute",pet);
      this.routePair=pet;
      console.log("routePair",this.routePair);
    }

    /*return adopted pet to googlemapComponent*/
    getRoute(){
      console.log("in getRoute");
      return this.routePair;
    }


    /*getDogName(id){
      return this.http.get(`${this.BASE_URL}/api/dog/${id}`)
        .map((res)=>res.json());
    }

    edit(dog) {
      return this.http.put(`${this.BASE_URL}/api/dog/${dog.id}`, dog)
        .map((res) => res.json());
    }*/



}
