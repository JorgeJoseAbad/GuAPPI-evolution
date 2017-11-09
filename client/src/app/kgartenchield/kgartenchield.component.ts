import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DogService } from '../services/dog.service';
import { SessionService } from '../services/session.service';
import { KgartenService} from '../services/kgarten.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kgartenchield',
  templateUrl: './kgartenchield.component.html',
  styleUrls: ['./kgartenchield.component.css']
})


export class KgartenchieldComponent implements OnInit,OnChanges{
  @Input() pet:any;
  dogName:any;
  owner:any;
  adopter: any;
  imageURL: any;
  updatedPet={
    dog_id:'',
    userAdopt_id:'',
    userProp_id:'',
  };
  user:any=null;


  constructor(
    private dogservice: DogService,
    private session:SessionService,
    private kgartenservice: KgartenService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getDogName(this.pet.dog_id);
    this.getOwnerName(this.pet.userProp_id);
    this.getAdopterName(this.pet.userAdopt_id);
    this.getDogImage(this.pet.dog_id);

  }

  ngOnChanges(){
    this.user=this.session.user;
    console.log("in ngOnChanges this.user "+this.user);
  }

  getDogName(id){
    this.dogservice.get(id)
    .subscribe((dog)=>{
      console.log(dog[0].dogName);
      this.dogName=dog[0].dogName;
    })
  }

getOwnerName(id){
  this.session.get(id)
    .subscribe((owner)=>{
      console.log(owner.username);
      this.owner=owner.username;

    })
  }

getDogImage(id){
  this.dogservice.get(id)
  .subscribe((dog)=>{
    console.log(dog[0].imgUrl);
    this.imageURL=dog[0].imgUrl;
    console.log(this.imageURL);
  });
};

getAdopterName(id){
  this.session.get(id)
  .subscribe((adopter)=>{
    console.log(adopter.username);
    this.adopter=adopter.username;
  })
}

adoptDog(id,adopt_id){
    console.log("adopting dog");
    console.log(this.session.user.username);
    this.adopter=this.session.user.username;
    console.log(id);
    console.log(adopt_id);
    console.log(this.pet);
    this.updatedPet.dog_id=this.pet.dog_id;
    this.updatedPet.userAdopt_id=adopt_id;
    this.updatedPet.userProp_id=this.pet.userProp_id;
    console.log(this.updatedPet);
    this.kgartenservice.edit(id,this.updatedPet)
    .subscribe((pet)=>{
      console.log(pet);
    })
    /*Send kagarten service the adopted pet*/
    this.kgartenservice.traceRoute(this.updatedPet);

}

pulloutDog(id){
if (window.confirm('Are you sure you want to take this dog out of kindergarten?')) {
  this.kgartenservice.delete(id)
    .subscribe((res)=>{
      console.log(res);
      //this.router.navigate(['']); no util
    })
  }
}


}
