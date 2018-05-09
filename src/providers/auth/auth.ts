import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  /*
  server:run *:8000 
  ipconfig 
  changer localhost par l'ip
  */
  urlapi = "http://192.168.1.5:8000/oauth/v2/token";
  headers = new HttpHeaders;
  constructor(public http: HttpClient, private _storage: Storage) {
    console.log('Hello AuthProvider Provider');
    this.headers.set("Content-Type", "application/x-www-form-urlencoded");
  }
  loginUser(username: string, password: string) {
    let data = {
      grant_type: "password",
      client_id: "1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4",
      client_secret: "4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k",
      username: username,
      password: password
    };
    return this.http.post(this.urlapi, data, { headers: this.headers });
  }
  setSession(data) {
    return new Promise((resolve, reject) => {
      // save data one by one
      this._storage.ready().then((val) => {
        console.log(val);
        // save 
        this._storage.set('access_token', data['access_token']).then((val) => {
          console.log(val);
          // create the other one 
          this._storage.set('expires_in', data['expires_in']).then((val) => {
            console.log(val);
            // create 2 
            this._storage.set('token_type', data['token_type']).then((val) => {
              console.log(val);
              // create 3
              this._storage.set('refresh_token', data['refresh_token']).then((val) => {
                console.log(val);
                resolve();
              })
                .catch((err) => {
                  console.log(err);
                  reject();
                })
            })
              .catch((err) => {
                console.log(err);
                reject();
              })
          })
            .catch((err) => {
              console.log(err);
              reject();
            })
        })
          .catch((err) => {
            console.log(err);
            reject();
          })
      })
        .catch((err) => {
          console.log(err);
          reject();
        })
    });
    // return promise;
  }
  isAuth() {
    return this._storage.get('access_token')
  }
  isController(){
    let urlcheck = "https://192.168.1.5:8000/api/user/?token=";
    return new Promise(function(resolve,reject){
      this._storage.get("access_token").then((val)=>{
        let token = val;
        if(val.length>0){
          urlcheck = urlcheck+val;
          resolve(this.http.get(this.urlapi,{headers:this.headers}));
        }
        else{
          console.log("hack");
          reject("hack");
        }
      },err=>{
        console.log(err);
        reject(err)
      })
      .catch(err=>{
        console.log(err);
        reject(err);
      })
    });
  }
  /**
   * getUser
   */
  getUser(token:string) {
    let url= "http://192.168.1.5:8000/api/user";
    let body = new HttpParams()
    .set('token',token);
    return this.http.post(url,body,{headers:this.headers});
  }
  logOut(){
    return this._storage.clear();
  }

}
