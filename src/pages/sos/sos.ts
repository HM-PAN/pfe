import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from "@ionic-native/call-number";

/**
 * Generated class for the SosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sos',
  templateUrl: 'sos.html',
})
export class SosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private callsvc: CallNumber) {
  }
  call(){
    this.callsvc.callNumber('197',true).then(()=>{
      console.log('worked');
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
  }
    call2(){
      this.callsvc.callNumber('94410833',true).then(()=>{
        console.log('worked');
      }).catch((err)=>{
        alert(JSON.stringify(err))
      });
    }
      call3(){
        this.callsvc.callNumber('94410833',true).then(()=>{
          console.log('worked');
        }).catch((err)=>{
          alert(JSON.stringify(err))
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosPage');
  }

}
