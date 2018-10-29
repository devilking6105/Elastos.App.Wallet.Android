import { Component} from '@angular/core';
import {IdHomeComponent} from "../../../pages/id/home/home";
import {Config} from "../../../providers/Config";

import { NavController, NavParams} from 'ionic-angular';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {DataManager} from "../../../providers/DataManager";
import {Util} from "../../../providers/Util";

@Component({
  selector: 'id-import',
  templateUrl: 'import.html',
})
export class IdImportComponent {
  private kycObj:any={};
  keyStoreContent="";
// <<<<<<< HEAD
//   ngOnInit(){
//       this.setTitleByAssets('text-id-import');
//     let masterWalletId = Config.getCurMasterWalletId();
//
//     this.localStorage.getKyc().then((val)=>{
//             console.info(" import.ts ElastJs ngOnInit val" + val);
//             if(this.isNull(val)){
// =======
  constructor(public navCtrl: NavController,public navParams: NavParams,public native :Native,public localStorage: LocalStorage,public dataManager :DataManager){
    this.init();
}
  init(){
      this.localStorage.getKyc().then((val)=>{
            if(Util.isNull(val)){
               this.kycObj = {};
            }else{
               this.kycObj =JSON.parse(val);
            }
      })
  }

  onImport(){
    if(Util.isNull(this.keyStoreContent)){
           this.native.toast_trans("text-id-kyc-import-no-message");
           return;
    }
    let masterWalletId = Config.getCurMasterWalletId();
    let addObjs = JSON.parse(this.keyStoreContent);

    console.info(" import.ts ElastJs onImport" + this.keyStoreContent);

    for(let key in addObjs[masterWalletId]){
      this.kycObj[masterWalletId][key] =  addObjs[masterWalletId][key];
    }

    this.localStorage.setKyc(this.kycObj).then(()=>{
      this.native.toast_trans('text-exprot-sucess-message');
      this.native.Go(this.navCtrl,IdHomeComponent);

    });
  }
}
