import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogService } from '../services/dog.service';
import { SessionService } from '../services/session.service';
import { KgartenService } from '../services/kgarten.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kgartenchield',
  templateUrl: './kgartenchield.component.html',
  styleUrls: ['./kgartenchield.component.css']
})


export class KgartenchieldComponent implements OnInit, OnChanges {
  @Input() pet: any;
  dogName: any;
  owner: any;
  adopter: any;
  imageURL: any;
  updatedPet = {
    dog_id: '',
    userAdopt_id: '',
    userProp_id: '',
  };
  user: any = null;


  constructor(
    private dogservice: DogService,
    public session: SessionService,
    private kgartenservice: KgartenService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getDogName(this.pet.dog_id);
    this.getOwnerName(this.pet.userProp_id);
    this.getAdopterName(this.pet.userAdopt_id);
    this.getDogImage(this.pet.dog_id);
    this.idUserLoged();

  }

  ngOnChanges() {
    this.idUserLoged();
    console.log("in ngOnChanges this.user " + this.user);
  }

  getDogName(id) {
    this.dogservice.get(id)
      .subscribe((response) => {
        console.log(response.body[0].dogName);
        this.dogName = response.body[0].dogName;
      })
  }

  getOwnerName(id) {
    this.session.get(id)
      .subscribe((response) => {
        this.owner = response.body.username;
      })
  }

  getDogImage(id) {
    this.dogservice.get(id)
      .subscribe((response) => {
        console.log(response.body[0].imgUrl);
        this.imageURL = response.body[0].imgUrl;
        console.log(this.imageURL);
      });
  };

  getAdopterName(id) {
    this.session.get(id)
      .subscribe((response) => {
        this.adopter = response.body.username;
      })
  }

  adoptDog(id) {
    this.session.isLoggedIn()
      .subscribe(
        (res) => {
          if (res.body.username) {
            this.updatedPet.dog_id = this.pet.dog_id;
            this.updatedPet.userAdopt_id = this.user._id;
            this.updatedPet.userProp_id = this.pet.userProp_id;
            console.log(this.updatedPet);
            this.kgartenservice.edit(id, this.updatedPet)
              .subscribe((pet) => {
                this.adopter = this.user.username
                console.log("pet actualizada", pet);
                /*Send kagarten service the adopted pet*/
                this.kgartenservice.traceRoute(this.updatedPet);
              },
                (err) => console.error(err)
              )
          }
        },
        (err) => console.error(err)
      )
  }

  pulloutDog(id) {
    if (window.confirm('Are you sure you want to take this dog out of kindergarten?')) {
      this.kgartenservice.delete(id)
        .subscribe((res) => {
          console.log(res);
        },
          (err) => console.error(err)
        )
    }
  }

  idUserLoged() {
    this.session.isLoggedIn()
      .subscribe(
        (response) => {
          this.user = response.body;
        },
        (err) => console.error(err)
      )
  }


}
