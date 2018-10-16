import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IDManager} from "../../../providers/IDManager"
import {ApiUrl} from "../../../providers/ApiUrl"
import {TransferComponent} from "../../../pages/coin/transfer/transfer.component";
import {Observable} from 'rxjs';
import 'rxjs/add/observable/timer';
import {Config} from "../../../providers/Config"


@Component({
  selector: 'page-bankcardauth',
  templateUrl: 'bankcardauth.html',
})
export class BankcardauthPage extends BaseComponent implements OnInit{
  debitCard={fullName:'刘博群',identityNumber:'220106198402038222',cardNumber:'6225880167820399',cardMobile:'15210335978',cardCode:'',type:"bankCard"};
  payMoney = 0;
  unit:string="ELA";
  priceObj:any={};
  parms:any;
  did:any;
  serialNum:string;
  path:string;

  ngOnInit(){
    this.setTitleByAssets('text-card-debit');
    this.parms = this.getNavParams().data;
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
    let timestamp = this.getTimestamp();
    let parms ={"appid":"elastid","timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.GET_PRICE,parms).toPromise().then().then(data => {
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
    let timestamp = this.getTimestamp();
    let parms ={"mobile":mobile,"code":code,"serialNum":this.serialNum,"timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.SEND_CODE,parms).toPromise().then(data=>{

    }).catch(error => {

    });
  }

  public onSendCode(): Observable<boolean> {
    return Observable.timer(1000).map((v, i) => true);
  }

  sendCode(phone){
    if(this.isNull(phone)){
      this.messageBox('text-phone-message-1');
       return;
     }

    if(this.checkCellphone(phone)){
       this.messageBox('text-phone-message-2');
       return;
    }
       this.sendCodeHttp(phone);
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
            self.popupProvider.ionicAlert('confirmTitle', 'text-bankcard-auth-exist').then((data) => {
            });
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

           this.Go(TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.debitCard, "walletInfo" : { "Type" : "Standard"}});
         });
     })
   }

   checkParms(){

    if(this.isNull(this.debitCard.fullName)){
      this.messageBox('text-realname-message');
       return;
}

if(this.isNull(this.debitCard.identityNumber)){
      this.messageBox('text-cardNo-message-1');
  return;
}

if(this.isCardNo(this.debitCard.identityNumber)){
  this.messageBox('text-cardNo-message-2');
  return;
}



    if(this.isNull(this.debitCard.cardNumber)){
      this.messageBox('text-debitCard-message-1');
       return;
     }

     console.info('ElastJs  this.debitCard.cardNumber'+ this.debitCard.cardNumber)
     if(this.isBankCard(this.debitCard.cardNumber)){
      this.messageBox('text-debitCard-message-2');
       return;
     }

    if(this.isNull(this.debitCard.cardMobile)){
          this.messageBox('text-phone-message-1');
           return;
    }

    if(this.checkCellphone(this.debitCard.cardMobile)){
      this.messageBox('text-phone-message-2');
      return;
    }

    if(this.isNull(this.debitCard.cardCode)){
          this.messageBox('text-sendcode-message-1');
      return;
     }

     return true;
   }
}
