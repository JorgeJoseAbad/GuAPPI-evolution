import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

const BASEURL = environment.apiUrl;

export interface User{
  address: string,
  created_at: string,
  email: string,
  imgUrl: string,
  latitude: number,
  longitude: number,
  password: string,
  updated_at: string,
  username: string,
  _id: string
}


@Injectable()
export class SessionService {
  user:User;
  startLoginCompleted:boolean = false;
  options:Object = {withCredentials:false};

  constructor(private httpclient:HttpClient) {}

    handleError(e) {
      console.error("en handleError");
      return Observable.throw("Error Message: " + e.error.message);
    }

    signup(user) {
      return this.httpclient.post(`${BASEURL}/signup`, user)
        .map(res => res)
        .catch(this.handleError);
    }


 /*login and logout with httpclient*/
  login(userlogin): Observable<HttpResponse<User>>{
    return this.httpclient.post<User>(`${BASEURL}/login`, userlogin ,{
      withCredentials:true,
      observe: 'response'
    })
    .map(res => {this.user = res.body; return res})
    .catch(this.handleError);
  }

  logout():Observable<any> {
      return this.httpclient.post<any>(`${BASEURL}/logout`,{}, {withCredentials:true,observe: 'response' })
      .map(res => {
                    this.user = null; //destroy this session user
                    return res;
                  })
      .catch(this.handleError);
    }

    isLoggedIn(): Observable<HttpResponse<User>>{
      return this.httpclient.get<User>(`${BASEURL}/loggedin`,{
        withCredentials:true,
        observe: 'response'
      })
        .map(res => {return res;})
        .catch(this.handleError);
    }

    /*this.isLoggedIn()
        .subscribe( (user:User) =>{
        console.log(`Welcome again user ${user.username}`)
        this.user = user;
        this.startLoginCompleted = true;
      }, e => this.startLoginCompleted = true);*/


    getPrivateData(): Observable<HttpResponse<User>> {
      return this.httpclient.get<User>(`${BASEURL}/private`,{
        withCredentials:true,
        observe: 'response'
      })
        .map(res => {return res;})
        .catch(this.handleError);

    }

    get(id){
      return this.httpclient.get<User>(`${BASEURL}/api/user/${id}`,{observe: 'response' })
      .map(res=>res.body)
      .catch(this.handleError);
    }

}
