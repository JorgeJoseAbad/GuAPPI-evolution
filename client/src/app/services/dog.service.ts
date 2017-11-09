import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  constructor(private http: Http) {}

  handleError(e) {
    console.error("Error in Dog");
    return Observable.throw(e.json().message);
  }

  getList() {
    return this.http.get(`${this.BASE_URL}/api/dog`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  get(id) {
    return this.http.get(`${this.BASE_URL}/api/dog/${id}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }


 //load new dog from file uploader
  newDog(dog) {
    console.log(dog);
    return this.http.post(`${this.BASE_URL}/api/dog`, {dog},this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  add(dog) {
    return this.http.post(`${this.BASE_URL}/api/dog`,dog)
      .map((res)=> res.json())
      .catch(this.handleError);
  }

  edit(dog) {
    return this.http.put(`${this.BASE_URL}/api/dog/${dog.id}`, dog)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/dog/${id}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }


  getDogsByOwnerID(id){
    return this.http.get(`${this.BASE_URL}/api/dog/user/${id}`)
      .map((res) => res.json())
      .catch(this.handleError);

  }

}
