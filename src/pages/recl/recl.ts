import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the ReclPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recl',
  templateUrl: 'recl.html',
})
export class ReclPage {
  theConsole: string = "Console Messages";
  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  }
private db: SQLiteObject;
reclamation:string;
lieurecl:string;
daterecl:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private dialogs: Dialogs) {
    this.connectTorecl();
  }
  private connectTorecl(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS `recl`(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,reclamation TEXT NOT NULL,lieurecl TEXT NOT NULL,daterecl TEXT NOT NULL)';
        this.db.executeSql(sql, {})
          .then(() => this.theConsole += "\n" + 'Executed Sql' + sql)
          .catch(e => this.theConsole += "Error:" + JSON.stringify(e));
      })
      .catch(e => this.theConsole += JSON.stringify(e));
  }
  addRECL(ev): void {
    // add form control
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
  //  var seconds = date.getSeconds();
    this.daterecl = day + "-" + (monthIndex + 1) + "-" + year + " " + hours + ":" + minutes;
    var sql = "INSERT INTO `recl`(reclamation,lieurecl,daterecl) VALUES('"+this.reclamation+"','"+this.lieurecl+"','"+this.daterecl+"')";
    this.db.executeSql(sql, {})
      .then(() => {
        this.dialogs.alert('reclamtion faite !')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e))
          this.navCtrl.setRoot(MenuPage);
      })
      .catch(err => {
        this.dialogs.alert(JSON.stringify(err))
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e))
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclPage');
  }

}
