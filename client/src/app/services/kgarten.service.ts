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
  BASE_URL: string = environment.apiUrl;
  routePair;

  constructor(private httpclient: HttpClient) { }

   handleError(e) {
     console.error("Error in Kgarten");
     return Observable.throw(e.message);
   }

    getList(): Observable<HttpResponse<any>> {
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
      return this.httpclient.post(`${this.BASE_URL}/api/kgarten`,dogKgarten,{observe: 'response'})
        .map((res)=> res.body)
        .catch(this.handleError);
    }

    edit(dogKgarten,updatedPet): Observable<HttpResponse<any>> {
      return this.httpclient.patch<any>(`${this.BASE_URL}/api/kgarten/${dogKgarten}`, updatedPet,{observe: 'response'})
        .map((res) => res.body)
        .catch(this.handleError);
    }

    delete(id) {
      return this.httpclient.delete(`${this.BASE_URL}/api/kgarten/${id}`,{observe: 'response'})
        .map((res) => res.body)
        .catch(this.handleError);
    }

   /*receive the pet adopted from kgartenchield component*/
    traceRoute(pet){
      this.routePair=pet;
    }

    /*return adopted pet to googlemapComponent*/
    getRoute(){
      return this.routePair;
    }

}
