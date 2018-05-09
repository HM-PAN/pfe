import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';


/*
  Generated class for the FichePvProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FichePvProvider {
  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  }
  private db: SQLiteObject;
  private token: string;
  private url = "http://192.168.1.5:8000/api/FichePV?token=";
  private headers = new HttpHeaders;
  constructor(public http: HttpClient, private _Storage: Storage, private _sqlLite: SQLite, private _dialog: Dialogs) {
    console.log('Hello FichePvProvider Provider');
    //this.connectToDb();
    this.headers.set("Content-Type", "application/x-www-form-urlencoded");
    // read token 
    this._Storage.get('access_token').then((val) => {
      this.token = val;
    }, err => {
      console.log("err to get token");
    });
  }
  insertfichepv(FichePV: Object) {
    let insert_url = this.url;
    let body = {
      cin_pass: FichePV['cin_pass'],
      nom_pass: FichePV['nom_pass'],
      prenom_pass: FichePV['prenom_pass'],
      adresse_pass: FichePV['adresse_pass'],
      date_pv: FichePV['date_pv'],
      num_train: FichePV['num_train'],
      montant_pv: FichePV['montant_pv'],
      lieu_controle: FichePV['lieu_controle'],
      classe: FichePV['classe'],
      destination_reele: FichePV['destination_reele'],
      type_abonn: FichePV['type_abonn'],
      dure_stationnement: FichePV['dure_stationnement'],
      date_fin_abon: FichePV['date_fin_abon'],
      type: FichePV['type_pv']
    }
    insert_url = insert_url + this.token;
    return this.http.post(insert_url, body, { headers: this.headers })
  }
  Synchro() {
    this.db.executeSql('SELECT * FROM `FichePV`', {})
      .then((res) => {
        for (var i = 0; i < res.rows.length; i++) {
          //this.expenses.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
          let iddelete = res.rows.item(i).ID;
          let FichePV = {
            cin_pass: res.rows.item(i).cin,
            nom_pass: res.rows.item(i).nompass,
            prenom_pass: res.rows.item(i).prenompass,
            adresse_pass: res.rows.item(i).adresse,
            num_train: res.rows.item(i).numtrain,
            date_pv: res.rows.item(i).datepv,
            montant_pv: res.rows.item(i).montant,
            lieu_controle: res.rows.item(i).lieu,
            classe: res.rows.item(i).classe,
            destination_reele: res.rows.item(i).destreele,
            type_abonn: res.rows.item(i).typeabo,
            dure_stationnement: res.rows.item(i).durestas,
            date_fin_abon: res.rows.item(i).datefinabo,
            type_pv: res.rows.item(i).Type
            //matcont ?
          }
          let dbinst = this.db;
          this.insertfichepv(FichePV).subscribe((val) => {
            if (val["stat"] === true) {
              console.log("synchro done");
              let stringoooo = "delet this id "+iddelete;
              // this._dialog.alert(stringoooo);
              var sql = 'DELETE FROM `FichePV` WHERE ID = "' + iddelete + '"';
              dbinst.executeSql(sql, {})
                .then(() => {
                  console.log('Executed Sql' + sql);
                  // this._dialog.alert("id is -> "+iddelete+" ya 5raaaaa ")
                })
                .catch(e => {
                  console.log("Error:" + JSON.stringify(e));
                  // this._dialog.alert(JSON.stringify(e),'reportting')
                });
            }
            else {
              console.log("faild synchro");
              this._dialog.alert(val['msg'])
                .then(t => {
                  console.log(t);
                }).catch(e => {
                  console.log(e);
                })
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

  public SynchroPv(): void {
    this._sqlLite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS `FichePV`(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, Type INTEGER, cin NUMERIC NOT NULL, nompass TEXT NOT NULL, prenompass TEXT NOT NULL, adresse TEXT NOT NULL, matcont TEXT NOT NULL, numtrain INTEGER NOT NULL, datepv TEXT NOT NULL, montant REAL NOT NULL, lieu TEXT NOT NULL, classe INTEGER, destreele TEXT, typeabo TEXT, durestas INTEGER, datefinabo TEXT)';
        this.db.executeSql(sql, {})
          .then(() => console.log('Executed Sql' + sql))
          .catch(e => console.log("Error:" + JSON.stringify(e)));
        this.Synchro();
      })
      .catch(e => console.log(JSON.stringify(e)));
  }

}
