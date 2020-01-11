import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FirebaseService } from '../../firebase/firebase.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  register(form) {
   this.firebaseService.doRegister(form.value).then((res) => {
     this.router.navigateByUrl('');
   }).catch((err) =>{
     alert("Invalid User Information");
   } );;
 }

}
