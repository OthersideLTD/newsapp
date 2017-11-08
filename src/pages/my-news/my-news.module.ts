import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNewsPage } from './my-news';

@NgModule({
  declarations: [
    MyNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNewsPage),
  ],
})
export class MyNewsPageModule {}
