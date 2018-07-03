import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ManagePage } from '../manage/manage';
import { AppConfig } from "../../app/app.config";


declare let cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public checked = false;
  public manageStatus = true;
  public  appList = [];
  
  constructor(
    public navCtrl: NavController
  ) {
    if(null == window.localStorage.getItem('appList')) {
      window.localStorage.setItem('appList', JSON.stringify(AppConfig.initAppList));
    }
    this.appList = JSON.parse(window.localStorage.getItem('appList'));
  }

  goManage() {
    this.navCtrl.push(ManagePage);
  }

  pressEvent() {
    this.checked = true
    this.manageStatus = false
  }

  delEvent(index) {
    this.appList.splice(index,1);
    window.localStorage.setItem('appList', JSON.stringify(this.appList));
    this.checked = false;
    this.manageStatus = true;
  }

  onClick(item) {
    if(this.checked) {
      return false;
    } else {
      cordova.plugins.TestPlugin.coolMethod(item.url,function(data){},function(error){});
    }
  }
}
