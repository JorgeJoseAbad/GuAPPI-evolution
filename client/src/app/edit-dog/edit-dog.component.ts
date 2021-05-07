import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService} from '../services/dog.service';
import { SessionService} from '../services/session.service'

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.css']
})
export class EditDogComponent implements OnInit {

  dogToEdit: any;
  editedDog: any;
  user: any;
  error: any;
  changeSuccess:boolean=false;
  changeError:boolean=false;
  breeds = ["Alsacian","setter","spaniel","chiguagua","podenco","galgo","mastin","alano","leon (da error BBDD)"];


  constructor(
    private dogservice: DogService,
    private session: SessionService,
    private router:Router
  ) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (response)=> {
          this.user = response;
          this.dogToEdit = this.dogservice.dog;
        },
        (err)=> this.error = err
      )
  }

  changeDog(){
    console.log(this.dogToEdit);
    this.dogservice.edit(this.dogToEdit)
     .subscribe(
       (response) => {
        // this.router.navigate(['dog']); //ok esto sin problema pero
        this.editedDog = response;
        this.changeSuccess = true;
       },
       (err) => {
         this.error = err;
         this.changeError= true
       },
       () => console.log(this.editedDog)
     )
  }

}
