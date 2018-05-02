import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AuthProvider } from '../../providers/auth/auth';
import { FichePvProvider } from '../../providers/fiche-pv/fiche-pv';
import { ReclamationProvider } from '../../providers/reclamation/reclamation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  password = '';
  constructor(public navCtrl: NavController, private _auth: AuthProvider, private _synchroPv: FichePvProvider, private _synchroRec: ReclamationProvider) {
    // synchro pv 
    // synchro rec
    //this._synchroPv.Synchro();
    //this._synchroRec.Synchro();
  }

  openMenu() {
    this.navCtrl.setRoot(MenuPage);
  }
  login() {
    if ((this.username.length > 0) && (this.password.length > 0)) {
      this._auth.loginUser(this.username, this.password)
        .subscribe(data => {
          console.log(data);
          if (data['access_token'] != null) {
            this._auth.setSession(data).then(()=>{
              this.openMenu();
            })
            .catch((err)=>{
              console.log(err);
            })          
          }
          else {
            console.log(data);
          }
        }, err => {
          console.log(err);
          // message to user
        })
    }
    else {
      console.log("missing arg");

    }
  }

}
