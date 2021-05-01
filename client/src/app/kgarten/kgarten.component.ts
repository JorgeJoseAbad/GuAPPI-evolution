import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KgartenService } from '../services/kgarten.service';
import { DogService} from '../services/dog.service';
import { SessionService} from '../services/session.service';

@Component({
  selector: 'app-kgarten',
  templateUrl: './kgarten.component.html',
  styleUrls: ['./kgarten.component.css'],

})
export class KgartenComponent implements OnInit {
  pets:any;
  dog:any;
  dogName:any;
  user:any;
  message:any;

  constructor(
    private petgarden: KgartenService,
    private dogservice: DogService,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.petgarden.getList()
    .subscribe(
      (response) => this.pets = response.body,
      (err) => this.message= err
    );
  }

updateKgarten(){
  if ((this.session.user!==undefined)&&(this.session.user!==null)){
    console.log(this.session.user);
    this.message="Updated by you, "+this.session.user.username;
    this.petgarden.getList()
    .subscribe(
      (response) => this.pets = response.body,
      (err) => this.message = err
    );
  } else this.message="You must be logged to update"
}


}
