import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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

  constructor(private httpclient: HttpClient) {}

  handleError(e) {
    console.error("Error in Dog");
    return Observable.throw(e.message);
  }

  getList():Observable<any> {
    return this.httpclient.get(`${this.BASE_URL}/api/dog`,{observe: 'response' })
      .map((res) => res.body)
      .catch(this.handleError);
  }

  get(id):Observable<any> {
    return this.httpclient.get(`${this.BASE_URL}/api/dog/${id}`,{observe: 'response'} )
      .map((res) => res.body)
      .catch(this.handleError);
  }


 //load new dog from file uploader
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

  edit(dog) {
    return this.httpclient.put(`${this.BASE_URL}/api/dog/${dog.id}`, dog,{observe: 'response'})
      .map((res) => res.body)
      .catch(this.handleError);
  }

  remove(id) {
    return this.httpclient.delete(`${this.BASE_URL}/api/dog/${id}`,{observe: 'response'})
      .map((res) => res.body)
      .catch(this.handleError);
  }


  getDogsByOwnerID(id){
    return this.httpclient.get(`${this.BASE_URL}/api/dog/user/${id}`,{observe: 'response'})
      .map((res) => res.body)
      .catch(this.handleError);

  }

}
