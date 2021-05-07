import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService} from '../services/dog.service';
import { SessionService} from '../services/session.service';
import { KgartenService} from '../services/kgarten.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})

export class DogComponent implements OnInit {
  dogs;
  mdogs;
  owner;

imgorigin=environment.apiUrl;

  user:any;

  kgarten: any;

  dogKgarten={
    prop_id:'',
    adopt_id:'',
    dog_id:'',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dogservice: DogService,
    private kgartenservice: KgartenService,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (response)=> this.user = response.body,
        (err)=> console.log(err)
      )
  }

  getListMyDogs(){
      this.dogservice.getDogsByOwnerID(this.user._id)
        .subscribe((response) => {
          this.dogs = response;
        });
      }

  getListAllDogs(){
      this.dogservice.getList()
        .subscribe((response) => {
          this.dogs = response;
        });
      }

sendDogKgarten(dogKgartenId,ownerId){
  console.log(dogKgartenId);
  console.log(ownerId);
  this.dogKgarten.dog_id=dogKgartenId;
  this.dogKgarten.prop_id=ownerId;
  this.dogKgarten.adopt_id=null;
  this.kgartenservice.add(this.dogKgarten)
    .subscribe((dogKgarten)=>{
      //this.dogKgarten=dogKgarten;
      console.log(dogKgarten);
    })
}

deleteDog(dogId){
  if (window.confirm('Are you sure you want delete this dog?')) {
    this.dogservice.remove(dogId)
      .subscribe((response)=>{
        console.log(response);
        this.router.navigate(['']);
      })
  }
}

editDog(dog){
  console.log(dog);
  //pendiente implementar
  this.dogservice.setActualDog(dog);
  this.router.navigate(['editDog']);
}

/*
    getDogDetails(id) {
        this.dog.get(id)
          .subscribe((dog) => {
            this.dog = dog;
            console.log("respuesta getdogdetails",this.dog);
          });

    }
*/

}
