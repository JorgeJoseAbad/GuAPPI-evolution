import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient,HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';



@Injectable()
export class KgartenService {
  //BASE_URL: string = 'http://localhost:3000';
  BASE_URL: string =environment.apiUrl;
  routePair;

  constructor(private httpclient: HttpClient) { }

   handleError(e) {
     console.error("Error in Kgarten");
     return Observable.throw(e.message);
   }

    getList(): Observable<HttpResponse<any>> {
      console.log("en getlist kgarten service");
      return this.httpclient.get<any>(`${this.BASE_URL}/api/kgarten`,{observe: 'response'})
        .map((res) => res)
        .catch(this.handleError);
    }

    get(id) {
      return this.httpclient.get(`${this.BASE_URL}/api/kgarten/${id}`,{observe: 'response'})
        .map((res) => res.body)
        .catch(this.handleError);
    }

    add(dogKgarten) {
      console.log(dogKgarten);
      return this.httpclient.post(`${this.BASE_URL}/api/kgarten`,dogKgarten,{observe: 'response'})
        .map((res)=> res.body)
        .catch(this.handleError);
    }

    edit(dogKgarten,updatedPet): Observable<HttpResponse<any>> {
      console.log(dogKgarten,updatedPet);
      return this.httpclient.put<any>(`${this.BASE_URL}/api/kgarten/${dogKgarten}`, updatedPet,{observe: 'response'})
        .map((res) => res.body)
        .catch(this.handleError);
    }

    delete(id) {
      console.log(id);
      return this.httpclient.delete(`${this.BASE_URL}/api/kgarten/${id}`,{observe: 'response'})
        .map((res) => res.body)
        .catch(this.handleError);
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
