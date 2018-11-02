import {Component} from '@angular/core';
import {ApiUrl} from "../../../../providers/ApiUrl";
import {IDManager} from "../../../../providers/IDManager";
import {TransferComponent} from "../../../../pages/coin/transfer/transfer.component";
import {Config} from "../../../../providers/Config"
import { PopupProvider } from '../../../../providers/popup';

import { NavController, NavParams,Events } from 'ionic-angular';
import {WalletManager} from '../../../../providers/WalletManager';
import {Native} from "../../../../providers/Native";
import {LocalStorage} from "../../../../providers/Localstorage";
import {DataManager} from "../../../../providers/DataManager";
import { Util } from '../../../../providers/Util';
@Component({
  selector: 'id-company',
  templateUrl: 'company.html',
})
export class IdKycCompanyComponent{
  businessObj={
              "type":"enterprise",
              "word":"北京比特大陆科技有限公司",
              "legalPerson":"詹克团",
              "registrationNum":"911101080804655794"
              };
  priceObj:any={};
  payMoney:number = 0;
  unit:string ="ELA";
  serialNum:string;
  parms:any;
  did:any;
  path:string = "";
  constructor(public navCtrl: NavController,public navParams: NavParams,public native :Native,public walletManager :WalletManager,public localStorage: LocalStorage,public events: Events,public dataManager :DataManager ,public popupProvider: PopupProvider){
    //this.init();
  }

  ionViewWillEnter(){
    console.log("ElastJs---IdKycCompanyComponent---ionViewWillEnter");
    this.init();
  }

  init() {
    console.log("Elastjs company.ts---begin---");

    this.parms = this.navParams.data;
    this.did = this.parms["id"];
    this.path = this.parms["path"] || "";

    console.log("Elastjs company.ts---parms---" + JSON.stringify(this.parms));

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
      let authObj = this.parms['adata'][0];
      if(authObj) {
        this.businessObj.word = authObj["retdata"]["word"];
        this.businessObj.legalPerson = authObj["retdata"]["legalPerson"];
        this.businessObj.registrationNum = authObj["retdata"]["RegistrationNum"];
      }
      //let unit = priceObj["unit"] || "ELA";
      this.serialNum = this.parms["serialNum"];
    }  }

  onCommit(): void {
    if(this.checkParms()){
      this.businessObj["serialNum"] = this.serialNum;

      let self = this;
      console.info("company.ts Elastos onCommit parms" + JSON.stringify(this.parms));

      self.localStorage.isAllReadyExist(Config.getCurMasterWalletId(), this.did, this.path,  this.businessObj.registrationNum, self.serialNum, function(isExit){
        console.info("company.ts Elastos onCommit isExit " + isExit);

        if (!isExit){

          self.saveKycSerialNum(self.serialNum);
        }
        else{
           self.popupProvider.ionicAlert('confirmTitle', 'text-enterprise-auth-exist').then((data) => {
           });
        }
      })
    }
  }

  saveKycSerialNum(serialNum){
    this.localStorage.getKyc().then((val)=>{

        let idsObj = JSON.parse(val);
        let masterWalletId = Config.getCurMasterWalletId();

        let order = idsObj[masterWalletId][this.did][this.path];
        order[serialNum] = {
                            serialNum:serialNum
                            ,pathStatus:0
                            ,payObj:{
                                        did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD"
                                        ,money:this.payMoney,appType:"kyc",chianId:"ELA"
                                        ,selectType:this.path,parms:this.businessObj
                                    }
                          };

        this.localStorage.setKyc(idsObj).then((newVal)=>{
          this.navCtrl.pop();
          this.native.Go(this.navCtrl,TransferComponent,{
            did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path
            ,parms:this.businessObj, "walletInfo" : { "Type" : "Standard"}});
// =======
//         let order = idsObj[this.did][this.path];
//         order[serialNum] = {serialNum:serialNum,pathStatus:0,payObj:{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.businessObj}};
//         this.localStorage.set("kycId",idsObj).then((newVal)=>{
//           this.native.Go(this.navCtrl,TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.businessObj});
// >>>>>>> origin/wallet_dev
        });
    })
}

  checkParms(): boolean{
     if(Util.isNull(this.businessObj.word)){
         this.native.toast_trans('text-word-message');
         return false;
     }

     if(Util.isNull(this.businessObj.legalPerson)){
      this.native.toast_trans('text-legalPerson-message');
      return false;
     }

     if(Util.isNull(this.businessObj.registrationNum)){
      this.native.toast_trans('text-registrationN-message');
      return false;
     }

     return true;
  }

  getPrice(){
    let timestamp = this.native.getTimestamp();
    let parms ={"appid":"elastid","timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.native.getHttp().postByAuth(ApiUrl.GET_PRICE,parms).toPromise().then().then(data => {
        if(data["status"] === 200){
          this.priceObj = JSON.parse(data["_body"]);
          this.payMoney = this.priceObj["price"] || 0.1;
          this.unit = this.priceObj["unit"] || "ELA";
          this.serialNum = this.priceObj["serialNum"];
         }
    }).catch(error => {

    });
  }
}
