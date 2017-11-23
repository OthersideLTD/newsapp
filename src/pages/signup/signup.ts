// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component, Renderer2 } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  public loginForm: any;
  public backgroundImage = 'assets/imgs/material-design-background.jpg';
  email : string = "";
  password : string = "";
  cpassword : string = "";
  formValid : boolean = false;
  regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  theEl : any = null;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public renderer: Renderer2,
    public authProvider: AuthProvider
  ) { }


  signup() {
    this.authProvider.signup(this.email,this.password);
  }

  checkEmail(event){
    this.checkValidity(this.regex.test(this.email));
  }

  checkP(){
    // console.log(this.password)
    if(this.theEl != null){
      let ifValid : boolean = (this.cpassword == this.password);
      this.checkValidity(ifValid);
      if(ifValid){
        this.renderer.addClass(this.theEl,"pGood");
        this.renderer.removeClass(this.theEl, "pBad");
      }else{
        this.renderer.addClass(this.theEl, "pBad");
        this.renderer.removeClass(this.theEl, "pGood");
      }
    }  
  }
  
  checkPassword(event){
    // console.log(this.cpassword)
    this.theEl = event.target.parentNode.parentNode.parentNode.parentNode;
    let ifValid : boolean = (this.cpassword == this.password);
    this.checkValidity(ifValid);
    if(ifValid){
      this.renderer.addClass(this.theEl,"pGood");
      this.renderer.removeClass(this.theEl, "pBad");
    }else{
      this.renderer.addClass(this.theEl, "pBad");
      this.renderer.removeClass(this.theEl, "pGood");
    }
    
  }

  checkValidity(check){
    if(check){
      if(this.formValid){
        this.formValid = true;
      }else{
        this.formValid = false;
      }
    }else{
      this.formValid = false;
    }
  }
  
  // signupFb(){
  //   this.authProvider.signupFb();
  // }
  // signupGoogle(){
  //   this.authProvider.signupGoogle();
  // }

  goToLogin() {
    this.navCtrl.push('LoginPage');
  }

  goToResetPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }
}
