import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KgartenService } from '../services/kgarten.service';
import { DogService} from '../services/dog.service';

@Component({
  selector: 'app-kgarten',
  templateUrl: './kgarten.component.html',
  styleUrls: ['./kgarten.component.css'],

})
export class KgartenComponent implements OnInit {
  pets:any;
  dog:any;
  dogName:any;

  constructor(
    private petgarden: KgartenService,
    private dogservice: DogService
  ) { }

  ngOnInit() {
    this.petgarden.getList()
    .subscribe((pets) => {
      this.pets = pets;
      console.log("lista de pets en el kgarten");
    });;
  }



}
