import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';
import { MenuPage } from '../menu/menu';
//import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the Form4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form4',
  templateUrl: 'form4.html',
})
export class Form4Page {
  theConsole: string = "Console Messages";
  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  }
  private db: SQLiteObject;
  matcont: string;
  numtrain: number;
  montant: number;
  cin: number;
  nompass: string;
  prenompass: string;
  adresse: string;
  //image:string;
  lieu: string;
  datepv: any;
  type:number;
  datefinabo:string;
  constructor(/*private camera: Camera,*/ public navCtrl: NavController, public navParams: NavParams , private sqlite: SQLite, private dialogs: Dialogs) {
  this.connectToDb();
}

  private connectToDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS `FichePV`(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, Type INTEGER, cin NUMERIC NOT NULL, nompass TEXT NOT NULL, prenompass TEXT NOT NULL, adresse TEXT NOT NULL, matcont TEXT NOT NULL, numtrain INTEGER NOT NULL, datepv TEXT NOT NULL, montant REAL NOT NULL, lieu TEXT NOT NULL, classe INTEGER, destreele TEXT, typeabo TEXT, durestas INTEGER, datefinabo TEXT)';
        this.db.executeSql(sql, {})
          .then(() => this.theConsole += "\n" + 'Executed Sql' + sql)
          .catch(e => this.theConsole += "Error:" + JSON.stringify(e));
      })
      .catch(e => this.theConsole += JSON.stringify(e));
  }
  addPV(ev): void {
    // add form control
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    // date of adding pv
    this.datepv = day + "-" + (monthIndex + 1) + "-" + year + " " + hours + ":" + minutes;
    var sql = "INSERT INTO `FichePV`(datepv,cin,nompass,prenompass,adresse,matcont,numtrain,montant,lieu,type,datefinabo) VALUES('"+this.datepv+"','"+this.cin+"','"+this.nompass+"','"+this.prenompass+ "','"+this.adresse+"','"+this.matcont+"','"+this.numtrain+ "','"+this.montant+"','"+this.lieu + "','"+4+ "','"+this.datefinabo+"')";
    this.db.executeSql(sql, {})
    .then(() => {
      this.dialogs.alert('form inserted')
        .then(() => {
          console.log('Dialog dismissed');
          this.navCtrl.push(MenuPage);
        })
        .catch(e => console.log('Error displaying dialog', e))
    })
      .catch(err => {
        this.dialogs.alert(JSON.stringify(err))
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e))
      });
  }
  getConsoleMessages() {
    return this.theConsole;
  }

/*async takePicture(): Promise<any>{
  try {
  this.image = await this.camera.getPicture(this.options);
}
catch(e){
  console.log(e);
}
}*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad Form4Page');
  }

}
