import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/throttleTime';
import { DogService} from '../services/dog.service';
import { SessionService} from '../services/session.service';

@Component({
  selector: 'app-childdog',
  templateUrl: './childdog.component.html',
  styleUrls: ['./childdog.component.css']
})

export class ChilddogComponent implements OnInit {
  @Input() dog:any;
  @Output() onGetOwner = new EventEmitter<string>(); //nNot used finally
  //owner$:  Observable<object>; // Not used finally
  name: string; // to get username in Observable


  constructor(
    private dogservice: DogService,
    private session:SessionService) { }

  ngOnInit() {
    this.getOwnerName(this.dog.user_id);
  }

  //Not used finally, activated by button

  onGetDogOwner () {
      this.getOwnerName(this.dog.user_id);
      //this.onGetOwner.emit(this.dog.user_id);
    }

    getOwnerName(id){
      console.log("in getOwnerName");
      console.log(id);
      this.session.get(id)
      .subscribe((dog_owner)=>{
        console.log(dog_owner);
        this.name=dog_owner.username
        //this.owner$=dog_owner;
        //console.log(this.owner$);
      });

    }

}
