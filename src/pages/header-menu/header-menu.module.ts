import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderMenuPage } from './header-menu';

@NgModule({
  declarations: [
    HeaderMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(HeaderMenuPage),
  ],
})
export class HeaderMenuPageModule {}
