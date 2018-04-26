import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Form1Page } from '../form1/form1';
import { Form2Page } from '../form2/form2';
import { Form3Page } from '../form3/form3';
import { Form4Page } from '../form4/form4';
import { Form5Page } from '../form5/form5';
import { Form6Page } from '../form6/form6';
/**
 * Generated class for the AjoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout',
  templateUrl: 'ajout.html',
})
export class AjoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  openForm1(){
    this.navCtrl.push(Form1Page);
  }
  openForm2(){
    this.navCtrl.push(Form2Page);
  }
  openForm3(){
    this.navCtrl.push(Form3Page);
  }
  openForm4(){
    this.navCtrl.push(Form4Page);
  }
  openForm5(){
    this.navCtrl.push(Form5Page);
  }
  openForm6(){
    this.navCtrl.push(Form6Page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutPage');
  }

}
