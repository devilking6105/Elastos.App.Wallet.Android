import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IDManager} from "../../../providers/IDManager"
import {ApiUrl} from "../../../providers/ApiUrl"
import {TransferComponent} from "../../../pages/coin/transfer/transfer.component";
import {Config} from "../../../providers/Config"

@Component({
  selector: 'page-identityauth',
  templateUrl: 'identityauth.html',
})
export class IdentityauthPage extends BaseComponent implements OnInit{
  personValidate = {fullName:'宋家准',identityNumber:'410426198811151012',"type":"identityCard"};//个人验证对象
  payMoney = 0;
  unit:string="ELA"
  priceObj:any={};
  parms:any;
  did:any;
  serialNum:string;
  path:string;
  ngOnInit(){
    this.setTitleByAssets('text-certified-person');
    this.parms = this.getNavParams().data;
    this.did = this.parms["id"];
    this.path = this.parms["path"] || "";
    console.info("identityauth.ts Elastos ngOnInit parms" + JSON.stringify(this.parms));

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
          this.Go(TransferComponent,{did:this.did,addr:"EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD"
            ,money:this.payMoney,appType:"kyc",chianId:"ELA",selectType:this.path,parms:this.personValidate, "walletInfo" : { "Type" : "Standard"}});
        });
    })
}

  checkIdentity(){
    if(this.isNull(this.personValidate.fullName)){
      this.messageBox('text-realname-message');
       return;
     }

    if(this.isNull(this.personValidate.identityNumber)){
      this.messageBox('text-cardNo-message-1');
     return;
   }

   if(this.isCardNo(this.personValidate.identityNumber)){
      this.messageBox('text-cardNo-message-2');
       return;
    }

    return true;
  }

  getPrice(){
    let timestamp = this.getTimestamp();
    let parms ={"appid":"elastid","timestamp":timestamp};
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    console.info("ElastJs identityauth.ts getPrice url "+ ApiUrl.GET_PRICE + " parms " + JSON.stringify(parms));
    this.getHttp().postByAuth(ApiUrl.GET_PRICE,parms).toPromise().then().then(data => {
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
