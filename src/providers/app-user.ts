import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseUrl } from "../url";
import { AppBase } from '../providers/app-base';
import { LocalNotifications } from '@ionic-native/local-notifications';

import 'rxjs/add/operator/map';
declare var cordova;
@Injectable()
export class AppUser {
  baseurl: string = BaseUrl;
  controller: string = "users/";
  httpOptions: any = null;

  constructor(public localNotifications: LocalNotifications, public http: Http, public base: AppBase) {
    this.controller = this.baseurl + this.controller;
    this.httpOptions = this.headerOptions('application/json');
  }


  localPushNotification(notdatas = {}) {


    this.localNotifications.hasPermission().then((granted) => {
      //notdatas['smallIcon'] = 'res://icon.png';
      notdatas['icon'] = 'file://assets/imgs/logo.png';

      notdatas['sound'] = 'file://assets/tune/alam.mp3';
      notdatas['foreground'] = true;

      cordova.plugins.notification.local.schedule(notdatas);

      //cordova.plugins.notification.local.schedule(notdatas);
      //this.localNotifications.schedule(notdatas);
    })


  }

  localPushnotificationCancel(ids = []) {
    this.localNotifications.hasPermission().then((granted) => {
      this.localNotifications.cancel(ids).then(() => {

      });
    })
  }
  localPushnotificationCancelAll() {
    this.localNotifications.hasPermission().then((granted) => {
      this.localNotifications.cancelAll().then(() => {

        return !0;
      });
    })
  }

  getLocalNotification() {
    this.localNotifications.hasPermission().then((granted) => {
      this.localNotifications.getAll().then((datas) => {

        return datas;
      })
    })
  }


  getUrl(action: string) {
    return this.controller + action;
  }
  headerOptions(datatype): any {
    let headers = new Headers();
    headers.append('Content-Type', datatype);
    if (this.base.fetchData('Tocken')) {
      headers.append('x-access-token', this.base.fetchData('Tocken'));
    }
    return headers;
  }

  login(data: Object) {
    let info = JSON.stringify(data);
    return this.http.post(this.getUrl('authenticate'), info, {
      headers: this.headerOptions('application/json')
    }).map(res => res.json());
  }
  forgotpassword(data: Object) {
    let info = JSON.stringify(data);
    return this.http.post(this.getUrl('forgotpassword'), info, {
      headers: this.headerOptions('application/json')
    }).map(res => res.json());
  }

  CommnFnNotLoader(data: any) {
    let info = JSON.stringify(data.param);
    return this.http.post(this.getUrl(data.functionName), info, {
      headers: this.headerOptions('application/json')
    }).map((res) => {
      return res.json();
    });
  }
  CommnFn(data: any) {

    this.base.showSpinner(!0, 'loading...');
    let info = JSON.stringify(data.param);
    return this.http.post(this.getUrl(data.functionName), info, {
      headers: this.headerOptions('application/json')
    }).map((res) => {
      this.base.showSpinner(!1);
      this.base.showSpinner(!1);
      return res.json();

    });
  }

  CommnFnMul(data: any) {

    let info = JSON.stringify(data.param);
    return this.http.post(this.getUrl(data.functionName), info, {
      headers: this.headerOptions('application/json')
    }).map(res => {

      return res.json();

    })
  }


  CommnFnGet(data: any) {
    this.base.showSpinner(!0, 'loading...');
    return this.http.get(this.ForgetUrl(data.functionName)).map(res => {
      console.log("fdgfd")
      this.base.showSpinner(!1);
      this.base.showSpinner(!1);
      return res.json();

    })
  }
  CommnDirectUrl(data) {
    return this.http.get(data).map(res => {
      console.log(typeof (res), res);
      return res.json();
    })
  }

  ForgetUrl(data) {
    return this.controller + data;
  }






  CommnFnForForm(data: any) {
    var dataP = this.serialize(data.param);
    ///this.base.showSpinner(!0, 'loading...');
    //let info = JSON.stringify(data.param);
    return this.http.post(this.getUrl(data.functionName), dataP, {
      headers: this.headerOptionsForFormData()
    }).map(res => {
      //this.base.showSpinner(!1);
      return res.json();
    })
  }

  headerOptionsForFormData(): any {
    let headers = new Headers();
    if (this.base.fetchData('Tocken')) {
      headers.append('x-access-token', this.base.fetchData('Tocken'));
    }
    return headers;
  }
  serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  headerOptionsios(datatype): any {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', datatype);

    return headers;
  }
  satBx1(data: any) {
    console.log("start11111111");
    this.base.showSpinner(!0, 'loading...');
    let info = JSON.stringify(data.param);
    return this.http.post('https://sandbox.itunes.apple.com/verifyReceipt', info, {
      headers: this.headerOptionsios('application/json'),
      withCredentials: true
    }).map((res) => {
      this.base.showSpinner(!1);
      return res.json();

    });
  }


  satBx(data: any) {
    //let ur = "https://sandbox.itunes.apple.com/verifyReceipt";
    let ur = data.urls;
    delete data['urls'];
    let info = JSON.stringify(data);
    return this
      .http
      .post(ur, info, {
        headers: this.httpOptions
      }).map(res => res.json());
  }
  getReceptUrl() {
    return this.http
      .post(this.getUrl('getReceptUrl'), {
        headers: this.httpOptions
      })
      .map(res => res.json());
  }

}



