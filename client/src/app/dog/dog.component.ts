import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService} from '../services/dog.service';
import { SessionService} from '../services/session.service';
import { KgartenService} from '../services/kgarten.service';


@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})

export class DogComponent implements OnInit {
  dogs;
  mdogs;
  owner;
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
    //this.dog.getList()
    //  .subscribe((dogs) => {
    //    this.dogs = dogs;
    //  });
    console.log("in ngOnInit dog component");
    this.user=this.session.user;
    console.log(this.user);
  }


  getListMyDogs(){
     console.log(this.session.user._id);
     console.log(this.session.user.username);
      this.dogservice.getDogsByOwnerID(this.session.user._id)
        .subscribe((dogs) => {
          this.dogs = dogs;
          console.log("lista de mis perros");
        });
      }

  getListAllDogs(){
      this.dogservice.getList()
        .subscribe((dogs) => {
          this.dogs = dogs;
          console.log("lista de perros");
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
      this.dogKgarten=dogKgarten;
      console.log(dogKgarten);
    })
}

deleteDog(dogId){
  this.dogservice.remove(dogId)
    .subscribe((response)=>{
      console.log(response);
      this.router.navigate(['']);
    })
}
/*
  createNewDog(){
    this.dog.add().suscribe

   }
*/

/*
    getDogDetails(id) {
        this.dog.get(id)
          .subscribe((dog) => {
            this.dog = dog;
            console.log("respuesta getdogdetails",this.dog);
          });

    }
*/
/* mas adelante
      deleteDog(id) {
      if (window.confirm('Are you sure?')) {
        this.dog.remove(id)
          .subscribe(() => {
            this.router.navigate(['']);
          });
          }
    }*/
}
