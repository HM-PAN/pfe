import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';

/*
  Generated class for the ReclamationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReclamationProvider {
  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  }
  url = "http://192.168.1.3:8000/api/reclamation?token=";
  headers = new HttpHeaders;
  private db: SQLiteObject;
  private token: string;
  constructor(public http: HttpClient, private _Storage: Storage, private _sqlLite: SQLite, private _dialog: Dialogs) {
    console.log('Hello ReclamationProvider Provider');
    //this.connectTorecl();
    this.headers.set("Content-Type", "application/x-www-form-urlencoded");
    this._Storage.get('access_token').then((val) => {
      this.token = val;
    }, err => {
      console.log("err to get token");
    });
  }
  insertReclamation(reclamation: Object) {
    let insert_url = this.url;
    let body = {
      contenu: reclamation['contenu'],
      lieu: reclamation['lieu'],
      date: reclamation['date']
    }
    insert_url = insert_url + this.token;
    return this.http.post(insert_url, body, { headers: this.headers })
  }
  Synchro() {
    this.db.executeSql('SELECT * FROM `recl`', {})
      .then((res) => {
        for (var i = 0; i < res.rows.length; i++) {
          // let line = JSON.stringify(res.rows.item(i));
          // this._dialog.alert(line);
          //this.expenses.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
          let iddelete = res.rows.item(i).ID;
          let reclamation = {
            contenu: res.rows.item(i).reclamation,
            lieu: res.rows.item(i).lieurecl,
            date: res.rows.item(i).daterecl
          }
          let dbisnt = this.db;
          this.insertReclamation(reclamation).subscribe((val) => {
            if (val["stat"] === true) {  
              // delete reclamation of the current res.rows.item(i).rowid;
              var sql = 'DELETE FROM `recl` WHERE ID = "' + iddelete + '"';
              dbisnt.executeSql(sql, {})
                .then(() => {
                  console.log('Executed Sql' + sql)
                  this._dialog.alert("done delete");
                })
                .catch(e => {
                  console.log("Error:" + JSON.stringify(e))
                  this._dialog.alert("delete error");
                });
              console.log("synchro done");
            }
            else {
              console.log("faild synchro");
            }
          }, err => {
            console.log(err);
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  public SynchroReclamation(): void {
    this._sqlLite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS `recl`(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,reclamation TEXT NOT NULL,lieurecl TEXT NOT NULL,daterecl TEXT NOT NULL)';
        this.db.executeSql(sql, {})
          .then(() => {
            console.log('Executed Sql' + sql);
            this.Synchro();
          })
          .catch(e => {
            console.log("Error:" + JSON.stringify(e))
          });
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }
}
