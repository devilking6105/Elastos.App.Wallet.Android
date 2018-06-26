import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ManagePage } from '../manage/manage';

declare let cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public press: number = 0;

  public iconList = [ {path: 'assets/imgs/slice2.png', name: 'Wallet' ,url: 'file:///android_asset/walet/www/index.html'},
    {path: 'assets/imgs/slice2.png', name: 'ToDO', url: 'file:///android_asset/todo/www/index.html'},
    {path: 'assets/imgs/slice2.png', name: 'CarTest',url: 'file:///android_asset/hello/www/index.html'},
    {path: 'assets/imgs/slice2.png', name: 'daPP4', url: 'file:///android_asset/hello/www/index.html'},
    {path: 'assets/imgs/slice2.png', name: 'daPP5', url: 'file:///android_asset/hello/www/index.html'}];
  public appList = [];

  constructor(public navCtrl: NavController) {
    window.localStorage.setItem('iconlist', JSON.stringify(this.iconList))
    this.appList = JSON.parse(window.localStorage.getItem('iconlist'))
    console.log(this.appList)
  }

  goManage() {
    this.navCtrl.push(ManagePage);
  }

  pressEvent(e, index) {
    this.appList.splice(index,1)
  }
  
  onClick(item) {
	cordova.plugins.TestPlugin.coolMethod(item.url,function(data){},function(error){});
  }
}