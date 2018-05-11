import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { AjoutPage } from '../pages/ajout/ajout';
import { ConsPage } from '../pages/cons/cons';
import { ReclPage } from '../pages/recl/recl';
import { SosPage } from '../pages/sos/sos';
import { Form1Page } from '../pages/form1/form1';
import { Form2Page } from '../pages/form2/form2';
import { Form3Page } from '../pages/form3/form3';
import { Form4Page } from '../pages/form4/form4';
import { Form5Page } from '../pages/form5/form5';
import { Form6Page } from '../pages/form6/form6';
import { CallNumber } from "@ionic-native/call-number";
import { Camera } from '@ionic-native/camera';
import { SQLite } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';
import { FormsModule } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { InformationsPage } from '../pages/informations/informations';
import { ReclamationProvider } from '../providers/reclamation/reclamation';
import { FichePvProvider } from '../providers/fiche-pv/fiche-pv';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    AjoutPage,
    ConsPage,
    ReclPage,
    SosPage,
    Form1Page,
    Form2Page,
    Form3Page,
    Form4Page,
    Form5Page,
    Form6Page,
    InformationsPage

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    AjoutPage,
    ConsPage,
    ReclPage,
    SosPage,
    Form1Page,
    Form2Page,
    Form3Page,
    Form4Page,
    Form5Page,
    Form6Page,
    InformationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CallNumber,
    Camera,
    SQLite,
    Dialogs,
    AuthProvider,
    ReclamationProvider,
    FichePvProvider,
    Network,
    Toast
  ]
})
export class AppModule { }
