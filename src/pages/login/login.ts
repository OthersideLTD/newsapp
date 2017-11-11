// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component, Renderer2 } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
  public backgroundImage = 'assets/imgs/material-design-background.jpg';
  email : string = "";
  password : string = "";
  formValid = false;
  regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public renderer: Renderer2,
    public authProvider: AuthProvider
  ) { }

  login() {
    this.authProvider.login(this.email,this.password);
  }

  checkEmail(event){
    this.checkValidity(this.regex.test(this.email));
  }
  checkPassword(event){
    // console.log((this.password.length > 0 ));
    this.checkValidity((this.password.length > 0 ));
  }

  checkValidity(check){
    if(check){
      this.formValid = true;
    }else{
      this.formValid = false;
    }
    
  }
  
  // loginFb(event){
  //   console.log(this.email + "-" + this.password );
  // }
  // loginGoogle(event){
  //   console.log(this.email + "-" + this.password );
  // }  

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }
}
