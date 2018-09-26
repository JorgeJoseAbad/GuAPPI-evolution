import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
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

  constructor(private http:Http,
              private httpclient:HttpClient) {
    /*this.isLoggedIn()
        .subscribe( (user:User) =>{
        console.log(`Welcome again user ${user.username}`)
        this.user = user;
        this.startLoginCompleted = true;
      }, e => this.startLoginCompleted = true);*/
    }

    handleError(e) {
      console.error("en handleError");
      return Observable.throw(e.json().message);
    }

    signup(user) {
      return this.httpclient.post(`${BASEURL}/signup`, user)
        .map(res => res)
        .catch(this.handleError);
    }

    /*signup(user) {
      return this.http.post(`${BASEURL}/signup`, user)
        .map(res => res.json())
        .catch(this.handleError);
    }*/

 /*login and logout with httpclient*/
  login(user) {
    return this.httpclient.post<User>(`${BASEURL}/login`, user ,{withCredentials:false,observe: 'response' })
    .map(res =>
      this.user=res.body
    )
    .catch(this.handleError);
  }

  logout() {
      return this.httpclient.post(`${BASEURL}/logout`,{}, this.options)
      .map(res => {
                    console.log(res);
                    this.user=null; //destroy this session user
                  })
      .catch(this.handleError);
    }

  /*
  Login with http
    login(user) {
      return this.http.post(`${BASEURL}/login`, user ,this.options)
      .map(res =>
        //console.log(typeof(res));
        //console.log(res);
        this.user=res.json()
        //console.log(this.user);

      )
      .catch(this.handleError);
    }
*/
/*
    logout() {
      return this.http.post(`${BASEURL}/logout`,{},this.options )
        .map(res => {
                      res.json();
                      console.log(res.json());
                      this.user=null; //destroy this session user
                    })
        .catch(this.handleError);
    }
*/

    isLoggedIn():Observable<User>{
      return this.http.get(`${BASEURL}/loggedin`, this.options)
        .map(res => {
          console.log("this user in loggedin");
          console.log(this.user);
          this.user = res.json();
          return this.user;
        })
        .catch(this.handleError);
    }


    getPrivateData() {
      return this.httpclient.get(`${BASEURL}/private`,{withCredentials:true})
        .map(res => {return res;})
        .catch(this.handleError);

    }

    get(id){
      return this.httpclient.get<User>(`${BASEURL}/api/user/${id}`,{observe: 'response' })
      .map(res=>res.body)
      .catch(this.handleError);
    }

    //Added to retrieve the user by Id
    /*get(id){
      return this.http.get(`${BASEURL}/api/user/${id}`)
      .map(res=>res.json())
      .catch(this.handleError);
    }*/
}
