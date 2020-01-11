import { Component } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  imageResponse: any;
  options: any;

  constructor(
    public firebaseService: FirebaseService,
    public imagePicker: ImagePicker,
  ) {}

  addPhoto(){
    this.imageResponse = [];

    this.imagePicker.hasReadPermission().then(
   (result) => {
     if(result == false){
       // no callbacks required as this opens a popup which returns async
       this.imagePicker.requestReadPermission();
     }
     else if(result == true){
       this.imagePicker.getPictures({
         maximumImagesCount: 1,
         outputType: 1
       }).then(
         (results) => {
           for (var i = 0; i < results.length; i++) {
             this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
             this.firebaseService.uploadImage('data:image/jpeg;base64,' + results[i]);
           }
         }, (err) => console.log(err)
       )
     }
   }, (err) => {
     console.log(err);
   });
  }

}
