import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, App, LoadingController, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';


@Injectable()
export class AuthProvider {

  constructor(
    // public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    // public navCtrl: NavController,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private facebook: Facebook
  ) {
    
    

  }

  userDoc : AngularFirestoreCollection<any>;
  
  loading1 = this.loadingCtrl.create({
    content:"Loading..."
  });

  async signup(email,password) {

    this.loading1.present();

    this.userDoc = this.afs.collection('users', ref =>{
      return ref.where('email', '==', email)
    });

    let user = this.userDoc.valueChanges();

    user.subscribe(userData=>{
      // console.log(userData.length)
      if(userData.length == 0){
        this.signupEmail(email,password);
      }else{
        this.login(email,password);
      }
    });
    
  }

  async signupEmail(email,password){
    
    try {

      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      this.loading1.dismiss();

      if (result) {
        let user = {
          uid: this.afAuth.auth.currentUser.uid,
          displayName : this.afAuth.auth.currentUser.displayName,
          email : this.afAuth.auth.currentUser.email,
          photoURL: this.afAuth.auth.currentUser.photoURL,
          phoneNumber : this.afAuth.auth.currentUser.phoneNumber
        };

        console.log(user);
        this.userDoc.add(
          user
        );
          const loading = this.loadingCtrl.create({
            duration: 500
          });

        loading.onDidDismiss(() => {
          const alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Thanks for logging in.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
        loading.present();
        this.navCtrl.popToRoot();
      }
    } catch (e) {

      this.loading1.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: e.message,
          buttons: ['Dismiss']
        });
        alert.present();
        console.error(e);
    }
  }

  async login(email,password){

    this.loading1.present();

    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );

      this.loading1.dismiss();

      if (result) {
          const loading = this.loadingCtrl.create({
          duration: 500
        });

        console.log(this.afAuth.auth.currentUser);

        loading.onDidDismiss(() => {
          const alert = this.alertCtrl.create({
            title: 'Logged in!',
            subTitle: 'Thanks for logging in.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
        loading.present();
        this.navCtrl.popToRoot();
      }
    } catch (e) {

      this.loading1.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: 'Try Again',
          buttons: ['Dismiss']
        });
        alert.present();
        console.error(e);
    }
  }

  // async signupFb(){
  //   // this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

  //   this.facebook.login(['email']).then( (response) => {
  //       const facebookCredential = firebase.auth.FacebookAuthProvider
  //           .credential(response.authResponse.accessToken);

  //       firebase.auth().signInWithCredential(facebookCredential)
  //       .then((success) => {
  //           console.log("Firebase success: " + JSON.stringify(success));
  //           // this.userProfile = success;
  //       })
  //       .catch((error) => {
  //           console.log("Firebase failure: " + JSON.stringify(error));
  //       });

  //   }).catch((error) => { console.log(error) });
  

  // }
  // async signupGoogle(){
  //   this.googlePlus.login({
  //     'webClientId': '1007406560318-2vu44jbun22vhjrsbv6152q1mf84on05.apps.googleusercontent.com',
  //     'offline': true
  //   }).then( res => {
  //     firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
  //       .then( success => {
  //         console.log("Firebase success: " + JSON.stringify(success));
  //       })
  //       .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
  //     }).catch(err => console.error("Error: ", err));
  //   // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }

  

  get navCtrl(): NavController {
    return this.app.getRootNav();
  }
}
