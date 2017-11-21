import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PopoverPage');
  }

  logout(){
    this.authProvider.logout();
    this.viewCtrl.dismiss();
  }

  openSettings(){
    this.navCtrl.push("SettingsPage");
    this.viewCtrl.dismiss();
  }
  

}
