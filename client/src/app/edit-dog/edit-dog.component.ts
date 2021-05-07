import { Component, OnInit } from '@angular/core';
import { DogService} from '../services/dog.service';
import { SessionService} from '../services/session.service'

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.css']
})
export class EditDogComponent implements OnInit {

  editDog: any;
  editedDog: any;
  user: any;
  error: any;
  changeSuccess:boolean=false;
  changeError:boolean=false;
  breeds = ["Alsacian","setter","spaniel","chiguagua","podenco","galgo","mastin","alano","leon (da error BBDD)"];


  constructor(
    private dogservice: DogService,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (response)=> {
          this.user = response;
          this.editDog = this.dogservice.dog;
        },
        (err)=> this.error = err
      )
  }

  changeDog(){
    console.log(this.editDog);
    this.dogservice.edit(this.editDog)
     .subscribe(
       (response) => {
         this.editedDog = response;
         this.changeSuccess = true;
       },
       (err) => {
         this.error = err;
         this.changeError= true
       }
     )
  }

}
