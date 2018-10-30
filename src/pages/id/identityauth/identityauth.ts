import { Component} from '@angular/core';
import {IDManager} from "../../../providers/IDManager"
import {ApiUrl} from "../../../providers/ApiUrl"
import {TransferComponent} from "../../../pages/coin/transfer/transfer.component";
import {Config} from "../../../providers/Config"

import { PopupProvider } from '../../../providers/popup';

import { NavController, NavParams,Events } from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {DataManager} from "../../../providers/DataManager";
import { Util } from '../../../providers/Util';
@Component({
  selector: 'page-identityauth',
  templateUrl: 'identityauth.html',
})
export class IdentityauthPage{

  personValidate = {fullName:'宋家准',identityNumber:'410426198811151012',"type":"identityCard"};//个人验证对象
  payMoney = 0;
  unit:string="ELA"
  priceObj:any={};
  parms:any;
  did:any;
  serialNum:string;
  path:string;
  constructor(public navCtrl: NavController,public navParams: NavParams,public native :Native,public walletManager :WalletManager,public localStorage: LocalStorage,public events: Events,public dataManager :DataManager,public popupProvider: PopupProvider){
   this.init();
  }

  // ionViewWillEnter(){
  //   console.log("ElastJs---IdentityauthPage---ionViewWillEnter");
  //   this.init();
  // }
  init(){
    this.parms = this.navParams.data;
    this.did = this.parms["id"];
    this.path = this.parms["path"] || "";
    console.info("identityauth.ts Elastos IdentityauthPage init parms" + JSON.stringify(this.parms));

    //this.getPrice();
    if(!this.parms["serialNum"]){
      this.getPrice();
    }
    else{
      if (this.parms["payObj"]) {
        this.payMoney = this.parms["payObj"]["money"] || 0.1;
      }
      else{
        this.payMoney = 0.1;
      }

      //let unit = priceObj["unit"] || "ELA";
      this.serialNum = this.parms["serialNum"];
    }
  }

  onCommit(){
         if(this.checkIdentity()){
           let self = this;
           console.info("identityauth.ts Elastos onCommit parms" + JSON.stringify(this.parms));

           self.localStorage.isAllReadyExist(Config.getCurMasterWalletId(), this.did, this.path,  this.personValidate.identityNumber, self.serialNum,function(isExit){
             console.info("identityauth.ts Elastos onCommit isExit " + isExit);

             if (!isExit){

               self.saveKycSerialNum(self.serialNum);
             }
             else{
               self.popupProvider.ionicAlert('confirmTitle', 'text-ident-auth-exist').then((data) => {
               });
             }
           })

         }
  }

  saveKycSerialNum(serialNum){

    let masterWalletId = Config.getCurMasterWalletId();
    console.info("identityauth.ts Elastos saveKycSerialNum masterWalletId" + masterWalletId);
    this.localStorage.getKyc().then((val)=>{

      console.info("identityauth.ts Elastos saveKycSerialNum val" + val);

      let idsObj = JSON.parse(val);
        let order = idsObj[masterWalletId][this.did][this.path];
        order[serialNum] = {
                              serialNum:serialNum,pathStatus:0,
                              payObj:{
                                  did:this.did,
                                  addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",
                                  money:this.payMoney,
                                  appType:"kyc",chianId:"ELA",
                                  selectType:this.path,
                                  parms:this.personValidate
                              }};

        this.localStorage.setKyc(idsObj).then((newVal)=>{
          this.personValidate["serialNum"] = serialNum;
          this.native.Go(this.navCtrl, TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD"
            ,money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.personValidate, "walletInfo" : { "Type" : "Standard"}});

        });
    })
}

  checkIdentity(){
    if(Util.isNull(this.personValidate.fullName)){
      this.native.toast_trans('text-realname-message');
       return;
     }

    if(Util.isNull(this.personValidate.identityNumber)){
      this.native.toast_trans('text-cardNo-message-1');
     return;
   }

   if(Util.isCardNo(this.personValidate.identityNumber)){
      this.native.toast_trans('text-cardNo-message-2');
       return;
    }

    return true;
  }

  getPrice(){
    let timestamp = this.native.getTimestamp();
    let parms ={"appid":"elastid","timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;

    console.info("ElastJs identityauth.ts getPrice url "+ ApiUrl.GET_PRICE + " parms " + JSON.stringify(parms));
    this.native.getHttp().postByAuth(ApiUrl.GET_PRICE,parms).toPromise().then().then(data => {
      console.info("ElastJs identityauth.ts data "+  JSON.stringify(data));

      if(data["status"] === 200){

          this.priceObj = JSON.parse(data["_body"]);
          this.payMoney = this.priceObj["price"] || 0.1;
          this.unit = this.priceObj["unit"] || "ELA";
          this.serialNum = this.priceObj["serialNum"];
         }
    }).catch(error => {
        alert("identityauth getPrice error " + error);
    });
  }

}
