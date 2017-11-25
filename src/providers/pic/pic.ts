import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Loading, Platform, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the PicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var cordova: any;

@Injectable()
export class PicProvider {
  captureDataUrl: string;
  // loading: Loading;
  // file = new File();
  constructor(
    // public http: Http,
    public camera: Camera, 
    public transfer: Transfer,
    // public transferObj : TransferObject,
    // public file: File, 
    public filePath: FilePath,
    public platform: Platform,
    public toastCtrl: ToastController,
    public authProvider: AuthProvider 
  ) {
    
	  
  }
  public takePicture(sourceType, user) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imagePath;
      this.upload(this.captureDataUrl,user);
    }, (err) => {
      // Handle error
      this.presentToast('Error while selecting image.');
    });
  
    // Get the data of an image
    // this.camera.getPicture(options).then((imagePath) => {
    //   // Special handling for Android library
    //   // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    //   //   this.filePath.resolveNativePath(imagePath)
    //   //     .then(filePath => {
    //   //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //   //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //   //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //   //     });
    //   // } else {
    //   //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //   //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //   //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //   // }
    //   this.upload();
    // }, (err) => {
    //   console.log(err)
    //   this.presentToast('Error while selecting image.');
    // });
  }

  upload(captureDataUrl,user){
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot)=> {
        this.authProvider.updateDp(captureDataUrl,user);
        this.presentToast('Success');
     })
    .catch(err=>{
        this.presentToast('Error while uploading.' + err);
    }); 
  }
  // Create a new name for the image
  // private createFileName() {
  //   var d = new Date(),
  //   n = d.getTime(),
  //   newFileName =  n + ".jpg";
  //   return newFileName;
  // }
  
  // Copy the image to a local folder
  // private copyFileToLocalDir(namePath, currentName, newFileName) {
  //   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
  //     this.lastImage = newFileName;
  //   }, error => {
  //     this.presentToast('Error while storing file.');
  //   });
  // }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
}