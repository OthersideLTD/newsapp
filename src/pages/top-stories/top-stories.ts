import { Component, ChangeDetectorRef } from '@angular/core';
import { NewsApiProvider } from '../../providers/news-api/news-api';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the TopStoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-stories',
  templateUrl: 'top-stories.html',
})
export class TopStoriesPage {
  
  segment: String;
  newsArray: Array<any>;
  error: Boolean;
  haveData: Boolean
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public newsapiProvider: NewsApiProvider, 
    public ref: ChangeDetectorRef,
    // public iab: InAppBrowser
  ) {
    this.segment = 'politics';
    this.error = false;
    this.haveData = false;
  }
  segmentChanged(event) {
    this.haveData = false;
    this.error = false;
    if (event._value == 'politics') {
      this.newsapiProvider.getLatestNews().subscribe(
        data => {
          // console.log(data);
          if (data.status === 'ok') {
            this.newsArray = data.articles;
          } else {
            this.error = true;
          }
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        },
        err => {
          console.log(`Error fetching news
          ${ err }`);
          this.error = true;
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        }
      )
    }
    if (event._value == 'business') {
      this.newsapiProvider.getBusinessNews().subscribe(
        data => {
          // console.log(data);
          if (data.status === 'ok') {
            this.newsArray = data.articles;
          } else {
            this.error = true;
          }
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        },
        err => {
          console.log(`Error fetching news
          ${ err }`);
          this.error = true;
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        }
      )
    }
    if (event._value == 'sports') {
      this.newsapiProvider.getSportsNews().subscribe(
        data => {
          // console.log(data);
          if (data.status === 'ok') {
            this.newsArray = data.articles;
          } else {
            this.error = true;
          }
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        },
        err => {
          console.log(`Error fetching news
          ${ err }`);
          this.error = true;
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        }
      )
    }
  }

  ionViewWillEnter() {
    this.newsapiProvider.getLatestNews().subscribe(
      data => {
        // console.log(data);
        if (data.status === 'ok') {
          this.newsArray = data.articles;
        } else {
          this.error = true;
        }
        this.haveData = true;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      },
      err => {
        console.log(`Error fetching news
        ${ err }`);
        this.error = true;
        this.haveData = true;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      }
    )
  }
 

 
}
