import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { FirebaseService } from '../../firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  login(form) {
   this.firebaseService.doLogin(form.value).then((res) => {
     this.router.navigateByUrl('');
   }).catch((err) =>{
     alert("Incorrect Username or Password");
   } );
  }
}
