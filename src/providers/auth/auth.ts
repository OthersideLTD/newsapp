import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, ToastController, App, LoadingController, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { GooglePlus } from '@ionic-native/google-plus';
// import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

class User {
  displayName : string ;
  photoURL : any;
  uid : string;
  phoneNumber : any;
  emailVerfified: boolean;
  email : string;
  firstName: string;
  secondName: string;
  userName: string;
}

@Injectable()
export class AuthProvider {
  currentUser : User = {
    displayName : "",
    photoURL : "assets/imgs/placeholder2.png",
    uid : "",
    phoneNumber : "",
    emailVerfified: false,
    email : "",
    firstName: "",
    secondName: "",
    userName: ""
  };
  ifUser: boolean = false; 
  userDB ;
  constructor(
    // public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public app: App,
    // public navCtrl: NavController,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    // private googlePlus: GooglePlus,
    // private facebook: Facebook
  ) {
    
    this.unsubscribe();
    

  }

  userDoc : AngularFirestoreCollection<any>;
  uName : AngularFirestoreCollection<any>;
  
  

  async signup(email,password) {
    let loading1 = this.loadingCtrl.create({
      content:"Loading..."
    });

    loading1.present();

    this.userDoc = this.afs.collection('users', ref =>{
      return ref.where('email', '==', email)
    });

    this.signupEmail(email,password,loading1);
    // let user = this.userDoc.valueChanges();

    // user.subscribe(userData=>{
    //   // console.log(userData.length)
    //   if(userData.length == 0){
    //     this.signupEmail(email,password,loading1);
    //   }else{
    //     this.login(email,password);
    //   }
    // });
    
  }

  async signupEmail(email,password,loading1){
    
    try {

      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      

      if (result) {
        // let user = {
        //   uid: this.afAuth.auth.currentUser.uid,
        //   displayName : this.afAuth.auth.currentUser.displayName,
        //   email : this.afAuth.auth.currentUser.email,
        //   photoURL: this.afAuth.auth.currentUser.photoURL,
        //   phoneNumber : this.afAuth.auth.currentUser.phoneNumber
        // };

        // // console.log(user);
        // this.userDoc.add(
        //   user
        // );
        firebase.auth().currentUser.sendEmailVerification()
        .then(res =>{
          let resDb = this.afs.collection('/success');
          resDb.add({
            type:'EmailVerification',
            reponse: res,
            uid: this.afAuth.auth.currentUser.uid
          });
        })  
        .catch(err=>{
          let resDb = this.afs.collection('/success');
          resDb.add({
            type:'EmailVerification',
            error: err,
            uid: this.afAuth.auth.currentUser.uid
          });
        });

        loading1.dismiss();

        const loading = this.loadingCtrl.create({
          duration: 500
        });

        loading.onDidDismiss(() => {
          const alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'User Created',
            buttons: ['Dismiss']
          });
          alert.present();
        });
        loading.present();
        this.navCtrl.setRoot('HomePage');
        this.unsubscribe();
      }
    } catch (e) {

      loading1.dismiss();

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

    let loading1 = this.loadingCtrl.create({
      content:"Loading..."
    });

    loading1.present();

    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );

      if (result) {
        const loading = this.loadingCtrl.create({
          duration: 500
        });

        // console.log(this.afAuth.auth.currentUser);

        loading1.dismiss();

        loading.onDidDismiss(() => {
          const alert = this.alertCtrl.create({
            title: 'Logged in!',
            subTitle: 'Thanks for logging in.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
        loading.present();
        this.navCtrl.setRoot('HomePage');
        this.unsubscribe();
      }
    } catch (e) {

      loading1.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: 'Try Again',
          buttons: ['Dismiss']
        });
        alert.present();
        console.error(e);
    }
  }
  logout(){
    console.log("Log out")
    this.afAuth.auth.signOut();

    this.currentUser  = {
      displayName : "",
      photoURL : "assets/imgs/placeholder2.png",
      uid : "",
      phoneNumber : "",
      emailVerfified: false,
      email : "",
      firstName: "",
      secondName: "" ,
      userName: ""
    };
    
    this.navCtrl.setRoot('HomePage');
    this.unsubscribe();
  }

  unsubscribe(){
    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.ifUser = false;
        unsubscribe();
      } else { 
        this.ifUser = true;
        // this.currentUser = {
        //   displayName : user.displayName,
        //   photoURL : user.photoURL || "assets/imgs/placeholder2.png",
        //   uid : user.uid,
        //   phoneNumber : user.phoneNumber,
        //   emailVerfified: user.emailVerified,
        //   email : user.email,
        //   firstName: "",
        //   secondName: "",
        //   userName: ""
        // };
        
        // console.log(this.currentUser);
        unsubscribe();
        this.getUserDB(this.currentUser.uid);
      }
    });
  }

  getUserDB(uid){
    // this.userDoc = this.afs.collection('users', ref =>{
    //   return ref.where('uid', '==', uid)
    // });
    this.userDoc = this.afs.collection('/users/' + uid);

    this.userDB = this.userDoc.valueChanges();

    // console.log(this.userDB);
    
    this.userDB.subscribe(userData=>{
      // console.log(userData);
      this.currentUser = {
        displayName : userData[0].displayName || "",
        photoURL : userData[0].photoURL || "assets/imgs/placeholder2.png",
        uid : userData[0].uid || "",
        phoneNumber : userData[0].phoneNumber || "",
        emailVerfified: userData[0].emailVerified || false,
        email : userData[0].email || "",
        firstName: userData[0].firstName || "",
        secondName: userData[0].secondName || "",
        userName: userData[0].userName || "" 
      };
      // console.log(this.currentUser);
    });

  }
  saveDets(userData){
    this.currentUser.displayName = this.currentUser.firstName + " " +this.currentUser.secondName;
    let loading1 = this.loadingCtrl.create({
      content:"Loading..."
    });
    loading1.present();
    let ref = "/users/"+this.currentUser.uid;
    let userDB = this.afs.doc(ref);
    userDB.update(userData)
    .then(res =>{
      loading1.dismiss();
      loading1.onDidDismiss(() => {
        const alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Details Added!',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    })
    .catch(err=>{
      let resDb = this.afs.collection('/error');
      resDb.add({
        type:'EmailVerification',
        error: err,
        uid: this.afAuth.auth.currentUser.uid
      });
      loading1.dismiss();
      loading1.onDidDismiss(() => {
        const alert = this.alertCtrl.create({
          title: 'Failed',
          subTitle: err,
          buttons: ['Dismiss']
        });
        alert.present();
      });
    });
  }

  updateDp(url, user){
    user.photoURL = url;
    console.log(user)
    let ref = "/users/"+this.currentUser.uid;
    let userDB = this.afs.doc(ref);
    userDB.update(user)
    .then(res =>{
      this.presentToast('Success')
    })
    .catch(err=>{
      let resDb = this.afs.collection('/success');
      resDb.add({
        type:'EmailVerification',
        error: err,
        uid: this.afAuth.auth.currentUser.uid
      });
      this.presentToast('Error')
    });
  }

  // async uNameAvailability(uName,availability,formValid){
  //   let checkDB = await this.afs.collection('/users', ref =>{
  //     return ref.where('userName', '==', uName)
  //   });
  //   if (checkDB){
  //     // return (check == 0)
  //     // console.log(checkDB);
  //     let change = checkDB.valueChanges();
  //     change.subscribe(result=>{
  //       if(result.length>0){
  //         availability = false;
  //         formValid = availability;
  //         console.log(formValid);
  //       }else{
  //         availability = true;
  //         formValid = availability;
  //         console.log(formValid);
  //       }
  //     });
  //   }
    
  // }

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
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  

  get navCtrl(): NavController {
    return this.app.getRootNav();
  }
}
