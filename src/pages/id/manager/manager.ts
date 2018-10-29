//<<<<<<< HEAD
//import { Component,OnInit } from '@angular/core';
//import {BaseComponent} from "./../../../app/BaseComponent";
import {Config} from "./../../../providers/Config";

//=======
import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Events,Navbar} from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {DataManager} from "../../../providers/DataManager";
import {Util} from "../../../providers/Util";
//>>>>>>> origin/wallet_dev
/**
 * Generated class for the LauncherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-manager',
  templateUrl: 'manager.html',
})
export class IdManagerComponent{
  public kycIdArr:any=[];
  public isSelectObj:any={};
  masterWalletId = "0";
  selectAll = false;
  public backupWalletPlainText:any;
  idsObj:any;
// <<<<<<< HEAD
//   ngOnInit(){
//     this.masterWalletId = Config.getCurMasterWalletId();
//     this.setTitleByAssets('text-id-manager');
//         this.localStorage.getKyc().then((val)=>{
//         if(val === null){
//           this.kycIdArr = [];
//         }else{
//           this.kycIdArr = this.objtoarr(JSON.parse(val)[this.masterWalletId]);
// =======
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public navParams: NavParams,public native :Native,public walletManager :WalletManager,public localStorage: LocalStorage,public events: Events,public dataManager :DataManager){
          this.init();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e)=>{
      this.events.publish("idhome:update");
      this.navCtrl.pop();
    };
  }
   init(){
        this.masterWalletId = Config.getCurMasterWalletId();
        this.localStorage.get('kycId').then((val)=>{
        if(val === null){
          this.kycIdArr = [];
        }else{
          this.kycIdArr = Util.objtoarr(JSON.parse(val)[this.masterWalletId]);
          this.idsObj = JSON.parse(val);
        }
      });
  }

  onItem(id){

      if(Util.isNull(this.isSelectObj[id])){
        this.isSelectObj[id] = true;
        this.selectAll=this.setAllButton();
        return;
      }
      this.isSelectObj[id] = !this.isSelectObj[id];
      this.selectAll=this.setAllButton();
  }

  onNext(type){

    switch (type){

      case 1:   //导出
         let improtids = this.getSelsetId();
         this.downButton(improtids);
        break;
      case 2:   //删除
      let delids = this.getSelsetId();
      console.log(JSON.stringify(delids));
      this.delIds(delids);
        break;
      case 3:
        this.selectAll = !this.selectAll;
        this.setSelectAll(this.selectAll);
        break;
    }
  }

  setSelectAll(stauts)
  {
     for(let key in this.idsObj[this.masterWalletId]){
       this.isSelectObj[key] = stauts;
     }
  }

  getSelsetId(){
    let arr = [];
    for(let key in this.isSelectObj){
        if(this.isSelectObj[key]){
          arr.push(key);
        }
    }
    return arr;
  }

  setAllButton(){
    let isCheck:any=true;
    if(Object.keys(this.isSelectObj).length < this.kycIdArr.length){
      isCheck = false;
      return isCheck;
    }
    for(let key in this.isSelectObj){
        if(!this.isSelectObj[key]){
             isCheck = false;
             return isCheck;
        }
    }
        return isCheck;
  }

  downButton(ids){
    let masterWalletId = Config.getCurMasterWalletId();

    if(ids.length===0){
      this.native.toast_trans("text-down-please-message");
         return;
    }
     let idsObj = {};
     idsObj[masterWalletId] ={};

     let kycObj = this.idsObj[masterWalletId];
     for(let id in ids){
      let key =ids[id];
      idsObj[masterWalletId][key] = kycObj[key];
     }
     this.backupWalletPlainText = JSON.stringify(idsObj);
  }

  onCopay(){
    this.native.copyClipboard(this.backupWalletPlainText).then(()=>{
      this.native.toast_trans('text-copied-to-clipboard');
    }).catch(()=>{

    });
  }

  delIds(ids){
    let masterWalletId = Config.getCurMasterWalletId();


      if(ids.length===0){
        this.native.toast_trans("text-id-kyc-import-text-del-please-message");
        return;
      }
      for(let id in ids){
        let key =ids[id];
        delete this.idsObj[masterWalletId][key];
      }
//<<<<<<< HEAD

      // let obj ={};
      // let masterWalletId = Config.getCurMasterWalletId();
      // obj[masterWalletId] = this.idsObj;
      this.localStorage.setKyc(this.idsObj).then(()=>{
               this.kycIdArr = Util.objtoarr(this.idsObj);
               this.native.toast_trans('text-id-kyc-import-text-del-message');
// =======
//       this.localStorage.set("kycId",this.idsObj).then(()=>{
//                this.kycIdArr = Util.objtoarr(this.idsObj);
//                this.native.toast_trans('text-id-kyc-import-text-del-message');
// >>>>>>> origin/wallet_dev
      });
  }
}
