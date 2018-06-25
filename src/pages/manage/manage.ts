import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InfoPage } from '../info/info';

/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  public iconManagelist = [ 
    {path: 'assets/imgs/slice2.png', name: 'daPP1',size: '1256kb',date: 'Added 2017.08.07'},
    {path: 'assets/imgs/slice2.png', name: 'daPP2',size: '1256kb',date: 'Added 2017.08.07'},
    {path: 'assets/imgs/slice2.png', name: 'daPP3',size: '1256kb',date: 'Added 2017.08.07'},
    {path: 'assets/imgs/slice2.png', name: 'daPP4',size: '1256kb',date: 'Added 2017.08.07'},
    {path: 'assets/imgs/slice2.png', name: 'daPP5',size: '1256kb',date: 'Added 2017.08.07'}
  ];
  public appManageList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    window.localStorage.setItem('iconManagelist', JSON.stringify(this.iconManagelist))
    this.appManageList = JSON.parse(window.localStorage.getItem('iconManagelist'))
    console.log(this.appManageList)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  goInfo(index) {
    this.navCtrl.push(InfoPage)
  }
}
