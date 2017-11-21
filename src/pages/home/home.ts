import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
// import firebase from 'firebase';
import { SuperTabsController, SuperTabs } from 'ionic2-super-tabs';
import { PopoverPage } from '../popover/popover'; 

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  topStories : any = "TopStoriesPage";
  myNews : any = "MyNewsPage";
  popular : any = "PopularPage";
  topics : any = "TopicsPage"
  

   
  constructor(
    public navCtrl: NavController, 
    public superTabsCtrl: SuperTabsController,
    public popoverCtrl: PopoverController
  ) {
    this.superTabsCtrl.showToolbar(true);
    
  }
  ngAfterViewInit() {
    
      // must wait for AfterViewInit if you want to modify the tabs instantly
      // this.superTabsCtrl.setBadge('topStories', 5);
      // this.superTabsCtrl.showToolbar(true);
    
  }
  presentPopover(event) {
    // console.log(event)
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }
}
