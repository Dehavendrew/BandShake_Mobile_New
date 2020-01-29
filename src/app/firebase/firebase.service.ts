import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuthModule,
    public storage:  AngularFireStorage
  ) { }

  addUser(){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/users').add({
          name: "Drew",
          surname: "DeHaven",
          age: parseInt("12")
        })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
      })
    }

  addShake(user){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/shakes').add({
          user1: user.uid,
          user2: user.uid,
          event: "Career Fair"
        })
        .then(
          (res) => {
            resolve(res)
          },
          err => {reject(err)
          }
        )
      })
    }


 doRegister(value){
   return new Promise<any>((resolve, reject) => {

     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {

       var user = firebase.auth().currentUser;


       user.updateProfile({
          displayName: value.name,
          photoURL: "profileImages/default.jpg"
        })
       resolve(res);
     }, err => reject(err))
   })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
   }

   doLogout(){
     return new Promise<any>((resolve, reject) => {
       firebase.auth().signOut()
       .then(res => {
         resolve(res);
       }, err => reject(err))
     })
   }

  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      const filename = Math.floor(Date.now() / 1000);
      let storageRef = this.storage.ref("images/" + filename + ".jpg")
      storageRef.putString(imageURI, 'data_url').then(snapshot => {
        resolve(snapshot)}
      ), (err) => alert(err)
    })
  }

  getImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      storageRef.child(imageURI).getDownloadURL().then(url => {
        resolve(url)}
      ), (err) => alert(err)
    })
  }

  getShakes(user){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('shakes', ref => ref.where('user1', '==', user)).valueChanges().subscribe(val => resolve(val))
    })
  }

}
