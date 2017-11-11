import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopStoriesPage } from './top-stories';

@NgModule({
  declarations: [
    TopStoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(TopStoriesPage),
  ],
  exports: [
    TopStoriesPage
  ]
})
export class TopStoriesPageModule {}
