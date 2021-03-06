import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
//import { Observable } from 'rxjs/Observable';
//import { NgForOf } from '@angular/common';

@Injectable()
export class DogService {
  BASE_URL: string = environment.apiUrl;
  //BASE_URL: string = 'http://localhost:3000';
  options: Object = {withCredentials:true};

  dog: any; //dog for auxiliar ...

  constructor(private httpclient: HttpClient) {}

  private handleError(e : HttpErrorResponse) {
    console.error("Error in Dog");
    if (e.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', e.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${e.status}, ` +
        `body was: ${e.error}`);
    }
    return Observable.throw(e.message);
  }

  getList():Observable<HttpResponse<any>> {
    return this.httpclient.get<any>(`${this.BASE_URL}/api/dog`,{observe: 'response' })
      .map((res) => res.body)
      .catch(this.handleError);
  }

  get(id):Observable<HttpResponse<any>> {
    return this.httpclient.get<any>(`${this.BASE_URL}/api/dog/${id}`,{observe: 'response'} )
      .map((res) => res)
      .catch(this.handleError);
  }


 /*No use: load new dog from file uploader*/
 /*
  newDog(dog) {
    console.log(dog);
    return this.httpclient.post(`${this.BASE_URL}/api/dog`, {dog},{withCredentials:true,observe: 'response'})
      .map(res => res.body)
      .catch(this.handleError);
  }

  add(dog) {
    return this.httpclient.post(`${this.BASE_URL}/api/dog`,dog,{observe: 'response'})
      .map((res)=> res.body)
      .catch(this.handleError);
  }

  */

  edit(dog):Observable<HttpResponse<any>> {
    return this.httpclient.patch<any>(`${this.BASE_URL}/api/dog/${dog._id}`, dog ,{observe: 'response'})
      .map((res) => res.body)
      .catch(this.handleError);
  }

  remove(id) {
    return this.httpclient.delete(`${this.BASE_URL}/api/dog/${id}`,{observe: 'response'})
      .map((res) => res.body)
      .catch(this.handleError);
  }


  getDogsByOwnerID(id):Observable<HttpResponse<any>>{
    return this.httpclient.get<any>(`${this.BASE_URL}/api/dog/user/${id}`,{observe: 'response'})
      .map((res) => res.body)
      .catch(this.handleError);

  }

  setActualDog(dog){
      this.dog = dog;
      console.log("En el servicio, ",this.dog);
  }

  getActualDog():Observable<any>{
      return this.dog;
  }



}
