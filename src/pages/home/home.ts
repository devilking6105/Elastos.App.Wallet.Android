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
  public checked = false; // 删除按钮是否激活，激活时隐去跳转管理页面的按钮

  constructor(
    public navCtrl: NavController
  ) {
    if(null == window.localStorage.getItem('appList')) {
      window.localStorage.setItem('appList', JSON.stringify(AppConfig.initAppList));
    }
  }

  getAppList() {
    return JSON.parse(window.localStorage.getItem('appList'));
  }

  goManage() {
    this.navCtrl.push(ManagePage);
  }

  pressEvent() {
    this.checked = true
  }

  delEvent(index) {
    let appList = JSON.parse(window.localStorage.getItem('appList'));
    appList.splice(index,1);
    window.localStorage.setItem('appList', JSON.stringify(appList));
    this.checked = false;
  }

  onClick(item) {
    if(this.checked) {
      return false;
    } else {
      cordova.plugins.TestPlugin.coolMethod(item.url,function(data){},function(error){});
    }
  }
}
