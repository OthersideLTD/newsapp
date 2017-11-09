import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SuperTabsController, SuperTabs } from 'ionic2-super-tabs';

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


   
  constructor(public navCtrl: NavController, public superTabsCtrl: SuperTabsController ) {
    this.superTabsCtrl.showToolbar(true);
  }
  ngAfterViewInit() {
    
      // must wait for AfterViewInit if you want to modify the tabs instantly
      // this.superTabsCtrl.setBadge('topStories', 5);
      // this.superTabsCtrl.showToolbar(true);
    
    }

}
