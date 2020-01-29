import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase/firebase.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user: any
  photoURL: any
  shakelist: any

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
    public afAuth: AngularFireAuthModule,
  ) {

    firebase.auth().onAuthStateChanged((user) => {
        this.updatePage(user)
    })
  }


  shakeButton(){
    this.firebaseService.addShake(this.user);
  }

  addDataEntry(){
    this.firebaseService.addUser();
  }

  toRegister(){
     this.router.navigateByUrl('register');
  }

  toLogin(){
     this.router.navigateByUrl('login');
  }

  doLogout(){
    this.firebaseService.doLogout();
  }

  updatePage(user){
    this.user = user
    if(this.user){
      this.firebaseService.getImage(user.photoURL).then(url =>
        this.photoURL = url)
      this.firebaseService.getShakes(user.uid).then(shakes => this.shakelist = shakes)
    }
    else {
      this.photoURL = null;
    }
  }
}
