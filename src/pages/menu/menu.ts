import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjoutPage } from '../ajout/ajout';
import { ConsPage } from '../cons/cons';
import { ReclPage } from '../recl/recl';
import { SosPage } from '../sos/sos';
import { AuthProvider } from '../../providers/auth/auth';
import { MenuController } from 'ionic-angular';
import { InformationsPage } from '../informations/informations';
import { ReclamationProvider } from '../../providers/reclamation/reclamation';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { FichePvProvider } from '../../providers/fiche-pv/fiche-pv';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  user_info = {
    nom: '',
    prenom: '',
    tel: '',
    adresse: '',
    matricule: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthProvider, public menuCtrl: MenuController, private _synchroRec: ReclamationProvider, private _Storage: Storage, private _synchroPv: FichePvProvider) {

    //this._synchroRec.Synchro();
    let token;
    this._Storage.get('access_token').then((val) => {
      if (val != null && val.length > 0) {
        token = val;
        this._auth.getUser(token).subscribe((data) => {
          if (data['stat'] === true) {
            this.user_info = data['data'];
            this._synchroPv.SynchroPv();
            this._synchroRec.SynchroReclamation();
          } else {
            console.log(data);
          }
        }, err => {
          console.log(err);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  openAjout() {
    this.navCtrl.push(AjoutPage);
  }
  openCons() {
    this.navCtrl.push(ConsPage);
  }
  openRecl() {
    this.navCtrl.push(ReclPage);
  }
  openSos() {
    this.navCtrl.push(SosPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  ionViewCanEnter() {
    // here we can either return true or false
    // depending on if we want to leave this view
    this._auth.isAuth().then((val) => {
      if (val.length > 0) {
        return true;
      }
      else {
        return false;
      }
    })
      .catch((err) => {
        console.log(err);
        return false;
      })
  }
  openMenu() {
    this.menuCtrl.open();
  }
  openinfo() {
    this.navCtrl.push(InformationsPage);
  }
  logout() {
    this._auth.logOut().then((val) => {
      this.navCtrl.setRoot(HomePage);
    }).catch((err) => {
      console.log(err);
      this.navCtrl.setRoot(HomePage);
    });
  }



}
