import { Component} from '@angular/core';
import {IDManager} from "../../../providers/IDManager"
import {ApiUrl} from "../../../providers/ApiUrl"
import {TransferComponent} from "../../../pages/coin/transfer/transfer.component";
//<<<<<<< HEAD
import {Observable} from 'rxjs';
import 'rxjs/add/observable/timer';
import {Config} from "../../../providers/Config"


//=======
import { NavController, NavParams,Events } from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {DataManager} from "../../../providers/DataManager";
import { Util } from '../../../providers/Util';
//>>>>>>> origin/wallet_dev
@Component({
  selector: 'page-bankcardauth',
  templateUrl: 'bankcardauth.html',
})
// <<<<<<< HEAD
// export class BankcardauthPage extends BaseComponent implements OnInit{
//   //6214 8501 0138 0787
//   //6225 8801 6782 0399
//   debitCard={fullName:'刘博群',identityNumber:'220106198402038222',cardNumber:'6214850101380787',cardMobile:'15210335978',cardCode:'',type:"bankCard"};
//
//   //debitCard={fullName:'刘博群',identityNumber:'220106198402038222',cardNumber:'6225880167820399',cardMobile:'15210335978',cardCode:'',type:"bankCard"};
// =======
export class BankcardauthPage{
  //6214680046602502    6225880167820399
  //debitCard={fullName:'宋家准',identityNumber:'410426198811151012',cardNumber:'6214680046602502',cardMobile:'18210230496',cardCode:'',type:"bankCard"};
  //debitCard={fullName:'刘博群',identityNumber:'220106198402038222',cardNumber:'6214850101380787',cardMobile:'15210335978',cardCode:'',type:"bankCard"};
  //debitCard={fullName:'郝文博',identityNumber:'152601199902113616',cardNumber:'6214830176303468',cardMobile:'15114746136',cardCode:'',type:"bankCard"};
  debitCard={fullName:'徐晨',identityNumber:'370802199206192417',cardNumber:'6217710718887045',cardMobile:'18552462795',cardCode:'',type:"bankCard"};

  //>>>>>>> origin/wallet_dev
  payMoney = 0;
  unit:string="ELA";
  priceObj:any={};
  parms:any;
  did:any;
  serialNum:string;
  path:string;
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown:60,//总共时间
    disable:true
}
constructor(public navCtrl: NavController,public navParams: NavParams,public native :Native,public walletManager :WalletManager,public localStorage: LocalStorage,public events: Events,public dataManager :DataManager){
  this.init();
}
  init(){

    this.parms = this.navParams.data;

    console.log("-ElastJs---BankcardauthPage-- onCommit--parmar---"+JSON.stringify(this.parms));

    this.did = this.parms["id"];
    this.path = this.parms["path"] || "";
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

  sendCodeHttp(mobile){
    let code = (Math.random()*1000000000000000).toString().substring(0,6);
    let timestamp = this.native.getTimestamp();
    let parms ={"mobile":mobile,"code":code,"serialNum":this.serialNum,"timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.native.getHttp().postByAuth(ApiUrl.SEND_CODE,parms).toPromise().then(data=>{

    }).catch(error => {

    });
  }


    onCommit(){
      if(this.checkParms()){

        let self = this;
        console.info("bankcardauth.ts Elastos onCommit parms" + JSON.stringify(this.parms));

        self.localStorage.isAllReadyExist(Config.getCurMasterWalletId(), this.did, this.path,  this.debitCard.cardNumber, self.serialNum, function(isExit){
          console.info("bankcardauth.ts Elastos onCommit isExit " + isExit);

          if (!isExit){

            self.saveKycSerialNum(self.serialNum);
          }
          else{
            // self.popupProvider.ionicAlert('confirmTitle', 'text-bankcard-auth-exist').then((data) => {
            // });
          }
        })
      }

   }

   saveKycSerialNum(serialNum){
     let masterWalletId = Config.getCurMasterWalletId();

     this.localStorage.getKyc().then((val)=>{
         let idsObj = JSON.parse(val);
         let order = idsObj[masterWalletId][this.did][this.path];
         order[serialNum] = {serialNum:serialNum,pathStatus:0,payObj:{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.debitCard}};

         this.localStorage.setKyc(idsObj).then((newVal)=>{
           this.debitCard["serialNum"] = serialNum;

//<<<<<<< HEAD
           this.navCtrl.pop();

           this.native.Go(this.navCtrl, TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.debitCard, "walletInfo" : { "Type" : "Standard"}});
// =======
//            this.native.Go(this.navCtrl,TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.debitCard});
// >>>>>>> origin/wallet_dev
         });
     })
   }

   checkParms(){

    if(Util.isNull(this.debitCard.fullName)){
      this.native.toast_trans('text-realname-message');
       return;
}

if(Util.isNull(this.debitCard.identityNumber)){
  this.native.toast_trans('text-cardNo-message-1');
  return;
}

if(Util.isCardNo(this.debitCard.identityNumber)){
  this.native.toast_trans('text-cardNo-message-2');
  return;
}



    if(Util.isNull(this.debitCard.cardNumber)){
      this.native.toast_trans('text-debitCard-message-1');
       return;
     }


     if(!Util.isBankCard(this.debitCard.cardNumber)){
      this.native.toast_trans('text-debitCard-message-2');
       return;
     }

    if(Util.isNull(this.debitCard.cardMobile)){
      this.native.toast_trans('text-phone-message-1');
           return;
    }

    if(Util.checkCellphone(this.debitCard.cardMobile)){
      this.native.toast_trans('text-phone-message-2');
      return;
    }

    if(Util.isNull(this.debitCard.cardCode)){
          this.native.toast_trans('text-sendcode-message-1');
      return;
     }

     return true;
   }

   getCode(phone){
    if(Util.isNull(phone)){
      this.native.toast_trans('text-phone-message-1');
       return;
    }

   if(Util.checkCellphone(phone)){
        this.native.toast_trans('text-phone-message-2');
      return;
    }
    if(this.verifyCode.disable){
      this.verifyCode.disable = false;
      this.settime();
      this.sendCodeHttp(phone);
    }
      }

      //倒计时
      settime() {
        if (this.verifyCode.countdown == 0)
            {
              this.verifyCode.verifyCodeTips = "获取验证码";
              this.verifyCode.disable = true;
              this.verifyCode.countdown = 60;
              return;
            } else {
               this.verifyCode.countdown--;
            }
            setTimeout(() => {
              this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒"; this.settime();
            }, 1000);
           }
}
