import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';
/**
 * Generated class for the ConsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cons',
  templateUrl: 'cons.html',
})
export class ConsPage {
  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  }
  pv_list = [];
  private db: SQLiteObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private dialogs: Dialogs) {
    this.connectToDb();
    //this.loadPV();
  }
  private connectToDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS `FichePV`(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, Type TEXT, cin NUMERIC NOT NULL, nompass TEXT NOT NULL, prenompass TEXT NOT NULL, adresse TEXT NOT NULL, matcont TEXT NOT NULL, numtrain INTEGER NOT NULL, datepv TEXT NOT NULL, montant REAL NOT NULL, lieu TEXT NOT NULL, classe INTEGER, destreele TEXT, typeabo TEXT, durestas INTEGER, datefinabo TEXT)';
        this.db.executeSql(sql, {})
          .then(() => {
            console.log("ok db loaded");
            this.loadPV();
          })
          .catch(e => {
            this.dialogs.alert(JSON.stringify(e))
              .then(() => console.log('Dialog dismissed'))
              .catch(err => console.log('Error displaying dialog', err))
          });
      })
      .catch(e => {
        this.dialogs.alert(JSON.stringify(e))
          .then(() => console.log('Dialog dismissed'))
          .catch(err => console.log('Error displaying dialog', err))
      });
  }
  private loadPV(): void {
    this.db.executeSql('SELECT `ID`,`datepv`,`Type` FROM `FichePV` ', {})
      .then(res => {
        if (res != null && res.rows.length > 0) {
          this.dialogs.alert("Loading PV")
            .then(() => console.log('Dialog dismissed'))
            .catch(e => console.log('Error displaying dialog', e))
          for (let i = 0; i < res.rows.length; i++) {
            this.pv_list.push({
              "ID": res.rows.item(i).ID,
              "datepv": res.rows.item(i).datepv,
              "Type" : res.rows.item(i).Type,
            });
          }
        }
        else{
          this.dialogs.alert(" no pv saved !!")
            .then(() => console.log('Dialog dismissed'))
            .catch(e => console.log('Error displaying dialog', e))
        }
      })
      .catch(err => {
        this.dialogs.alert(JSON.stringify(err))
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e))
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsPage');
  }
  private delete(id) : void{
    var sql = 'DELETE FROM `FichePV` WHERE ID = "'+id+'"';
    this.db.executeSql(sql, {})
      .then(() => {
        // delete from list
        for (let i = 0; i < this.pv_list.length; i++) {
            if (this.pv_list[i].ID == id) {
                this.pv_list.splice(i, 1);
            }
        }
        this.dialogs.alert('pv deleted')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e))
      })
      .catch(err => {
        this.dialogs.alert(JSON.stringify(err))
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e))
      });
  }

}
