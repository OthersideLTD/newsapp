import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DPpopoverPage } from '../d-ppopover/d-ppopover';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  
  public backgroundImage = 'assets/imgs/material-design-background.jpg';
  currentUser  = this.authProvider.currentUser;
  regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  formValid: boolean = false;
  availability: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public popoverCtrl: PopoverController
  ) {
    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProfilePage');
  // }

  changeDP(event) {
    // console.log(event)
    let popover = this.popoverCtrl.create(DPpopoverPage);
    popover.present({
      ev: event
    });
  }
  setTrue(){
    this.formValid = true;
  }

  saveDets(){
    this.authProvider.saveDets(this.currentUser);
  }
}
