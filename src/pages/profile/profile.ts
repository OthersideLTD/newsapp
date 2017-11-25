import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
// import { DPpopoverPage } from '../d-ppopover/d-ppopover';
import { PicProvider } from '../../providers/pic/pic';

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
    public popoverCtrl: PopoverController,
    public picProvider: PicProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProfilePage');
  // }

  // changeDP(event) {
  //   // console.log(event)
  //   let popover = this.popoverCtrl.create(DPpopoverPage);
  //   popover.present({
  //     ev: event
  //   });
  // }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.picProvider.takePicture(this.picProvider.camera.PictureSourceType.PHOTOLIBRARY,this.currentUser);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.picProvider.takePicture(this.picProvider.camera.PictureSourceType.CAMERA,this.currentUser);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  setTrue(){
    this.formValid = true;
  }

  saveDets(){
    this.authProvider.saveDets(this.currentUser);
  }

  // uNameAvailability(){
  //   this.authProvider.uNameAvailability(this.currentUser.userName,this.availability,this.formValid);
  // }
}
