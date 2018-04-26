import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsPage } from './cons';

@NgModule({
  declarations: [
    ConsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsPage),
  ],
})
export class ConsPageModule {}
