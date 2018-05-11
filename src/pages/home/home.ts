import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AuthProvider } from '../../providers/auth/auth';
import { FichePvProvider } from '../../providers/fiche-pv/fiche-pv';
import { ReclamationProvider } from '../../providers/reclamation/reclamation';
import { LoadingController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Network } from '@ionic-native/network';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  password = '';
  private loader;
  constructor(public navCtrl: NavController, private _auth: AuthProvider, private _synchroPv: FichePvProvider, private _synchroRec: ReclamationProvider, private loadingCtrl:LoadingController, private _dialog:Dialogs ) {
    
  }

  openMenu() {
    this.navCtrl.setRoot(MenuPage);
  }
  login() {
    this.presentLoading();
    if ((this.username.length > 0) && (this.password.length > 0)) {
      this._auth.loginUser(this.username, this.password)
        .subscribe(data => {
          this.loader.dismiss()
          console.log(data);
          if (data['access_token'] != null) {
            this._auth.setSession(data).then(()=>{
              this.openMenu();
            })
            .catch((err)=>{
              console.log(err);
              this._dialog.alert("the app crushed , please close it and open again","Unexcpected Error","ok");
            })          
          }
          else {
            console.log(data);
            this._dialog.alert("wrong username or passowrd","Wrong Acces","try later");
          }
        }, err => {
          console.log(err);
          this._dialog.alert("we can't reach our server ","connexion problem","try later");
          // message to user
        })
    }
    else {
      console.log("missing arg");

    }
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "...الرجاء الانتظار",
    });
    this.loader.present();
  }

}
