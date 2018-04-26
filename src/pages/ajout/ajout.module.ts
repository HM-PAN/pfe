import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutPage } from './ajout';

@NgModule({
  declarations: [
    AjoutPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutPage),
  ],
})
export class AjoutPageModule {}
