import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';

import { RouterModule, Routes } from "@angular/router";
import { DogComponent } from './dog/dog.component';
import { LoginComponent } from './login/login.component';

import { FileSelectDirective } from "ng2-file-upload";
import { FileUploadModule} from 'ng2-file-upload';
import { FooterComponent } from './footer/footer.component';
import { CentralareaComponent } from './centralarea/centralarea.component';

//import { AgmCoreModule } from 'angular2-google-maps/core';
import { AgmCoreModule } from '@agm/core';

import { GooglemapComponent } from './googlemap/googlemap.component';
import { KgartenComponent } from './kgarten/kgarten.component';
import { NewDogComponent } from './newDog/newDog.component';
import { ChilddogComponent } from './childdog/childdog.component';

import { DogService} from './services/dog.service';
import { SessionService} from './services/session.service';
import { KgartenService} from './services/kgarten.service';


import { environment} from '../environments/environment';
import { KgartenchieldComponent } from './kgartenchield/kgartenchield.component';
import { EditDogComponent } from './edit-dog/edit-dog.component';


const routes: Routes = [
  { path: '', redirectTo: 'header', pathMatch: 'full' },
  //{ path: '/header', component: HeaderComponent },
  { path: 'signup',  component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dog', component: DogComponent},
  { path: 'newDog', component: NewDogComponent},
  { path: 'editDog', component: EditDogComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    DogComponent,
    LoginComponent,
    FooterComponent,
    CentralareaComponent,
    GooglemapComponent,
    KgartenComponent,
    NewDogComponent,
    ChilddogComponent,
    KgartenchieldComponent,
    EditDogComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FileUploadModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.MY_APIKEY,
      libraries: ["places"]
    })
  ],
  providers: [DogService,SessionService,KgartenService],
  bootstrap: [AppComponent]
})


export class AppModule { }
