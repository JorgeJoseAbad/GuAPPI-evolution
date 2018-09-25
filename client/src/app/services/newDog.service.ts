import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class NewDogService {

  BASE_URL: string = "http://localhost:3000";
  options: Object = {withCredentials:true};

  constructor(private http: Http) { }

  hunewDog(dog) {
    console.log(dog);
    return this.http.post(`${this.BASE_URL}/api/dog`, {dog},this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(e) {
    console.error("Error en newDog");
    return Observable.throw(e.json().message);
  }

}
