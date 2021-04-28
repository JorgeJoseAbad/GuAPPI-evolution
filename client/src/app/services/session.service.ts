import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

const BASEURL = environment.apiUrl;

export interface User{
  _id:string,
  username:string,
  password:string,
  email:string,
  address: string,
  longitude: string,
  latitude: string
}

@Injectable()
export class SessionService {
  user:User;
  startLoginCompleted:boolean = false;
  options:Object = {withCredentials:false};

  constructor(private httpclient:HttpClient) {

    }

    handleError(e) {
      console.error("en handleError");
      return Observable.throw(e.message);
    }

    signup(user) {
      return this.httpclient.post(`${BASEURL}/signup`, user)
        .map(res => res)
        .catch(this.handleError);
    }


 /*login and logout with httpclient*/
  login(user) {
    return this.httpclient.post<User>(`${BASEURL}/login`, user ,{withCredentials:false,observe: 'response' })
    .map(res =>
      this.user=res.body
    )
    .catch(this.handleError);
  }

  logout():Observable<any> {
      return this.httpclient.post(`${BASEURL}/logout`,{}, {withCredentials:false,observe: 'response' })
      .map(res => {
                    console.log(res.body);
                    this.user=null; //destroy this session user
                  })
      .catch(this.handleError);
    }

    isLoggedIn():Observable<any>{
      return this.httpclient.post(`${BASEURL}/loggedin`,this.user,{ withCredentials:true,observe: 'response' })
        .map(res => {
          console.log("this user in loggedin");
          console.log(res.body);
          return res.body;
        })
        .catch(this.handleError);
    }

    /*this.isLoggedIn()
        .subscribe( (user:User) =>{
        console.log(`Welcome again user ${user.username}`)
        this.user = user;
        this.startLoginCompleted = true;
      }, e => this.startLoginCompleted = true);*/


    getPrivateData() {
      return this.httpclient.post(`${BASEURL}/private`,this.user,{withCredentials:true})
        .map(res => {return res;})
        .catch(this.handleError);

    }

    get(id){
      return this.httpclient.get<User>(`${BASEURL}/api/user/${id}`,{observe: 'response' })
      .map(res=>res.body)
      .catch(this.handleError);
    }

}
