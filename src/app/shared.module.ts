import { NgModule } from '@angular/core';
import { SuperTabsModule } from 'ionic2-super-tabs';

// import { File } from '@ionic-native/file';
// import { Transfer } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';
// import { Camera } from '@ionic-native/camera';

@NgModule({
  exports: [
    SuperTabsModule
    // File,
    // Transfer,
    // FilePath,
    // Camera

  ],
  providers:[
    // File,
    // Transfer,
    // FilePath,
    // Camera
  ]
})
export class SharedModule {}
