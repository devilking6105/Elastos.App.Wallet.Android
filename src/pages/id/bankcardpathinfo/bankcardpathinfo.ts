import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {BankcardauthPage} from '../../../pages/id/bankcardauth/bankcardauth';
import {PersonWriteChainPage} from "../../../pages/id/kyc/person-write-chain/person-write-chain";
import {IDManager} from "../../../providers/IDManager";
import {ApiUrl} from "../../../providers/ApiUrl";
import {Config} from "../../../providers/Config";

@Component({
  selector: 'page-bankcardpathinfo',
  templateUrl: 'bankcardpathinfo.html',
})
export class BankcardpathinfoPage extends BaseComponent implements OnInit{
  public backcardList =[];
  private parmar ={};
  public idsObj ={};
  ngOnInit(){
   this.parmar = this.getNavParams().data;
   console.log("---path---"+JSON.stringify(this.parmar));
   this.setTitleByAssets("text-bankcard-path-deatils");
    let masterWalletId = Config.getCurMasterWalletId();

    this.localStorage.getKyc().then((val)=>{
    if(val == null || val === undefined || val === {} || val === ''){
      return;
     }
    this.idsObj = JSON.parse(val);

    let pathList = this.idsObj[masterWalletId][this.parmar["id"]][this.parmar["path"]];

    for(let key in pathList){
      pathList[key]["id"] = this.parmar["id"];
      pathList[key]["path"] = this.parmar["path"];
       this.backcardList.push(pathList[key]);
    }


  });
  }

  onNext(item){
    this.jumpPage(item);
  }

  onCommit(){
    this.Go(BankcardauthPage,this.parmar);
  }

  jumpPage(item){
    switch(item["pathStatus"]){
          case 0 :
            this.Go(BankcardauthPage,item);
            break;
          case 1:
             this.getAppAuth(item);
              break;
          case 2 :
             this.Go(PersonWriteChainPage,item);
              break;
    }
}


getAppAuth(item){
  let serialNum = item["serialNum"];
  let txHash =  item["txHash"];
  console.log("getAppAuth======= txHash type "+typeof(txHash));
  console.log('ElastosJs--bankcardpathinfo.ts--getAppAuth----'+"---serialNum---"+serialNum+"---txHash---"+txHash);
  let timestamp = this.getTimestamp();
  let parms ={"serialNum":serialNum,
              "txHash":txHash,
              "timestamp":timestamp,
             }
  let checksum = IDManager.getCheckSum(parms,"asc");
  parms["checksum"] = checksum;
  this.getHttp().postByAuth(ApiUrl.APP_AUTH,parms).toPromise().then().then(data => {
    if(data["status"] === 200){
      console.log("sssss======="+JSON.stringify(data));
      let authResult = JSON.parse(data["_body"]);
      if(authResult["errorCode"] === "1"){
        this.messageBox("text-id-kyc-auth-fee-fail");
        return;
      }
      if(authResult["errorCode"] === "2"){
               this.messageBox("text-id-kyc-auth-query-timeout");
               return;
      }
      if(authResult["errorCode"] === "4"){
          this.messageBox("text-id-kyc-auth-uncompleted");
             return;
      }
      if(authResult["errorCode"] === "0"){
          item["adata"] = authResult["data"];

        if (authResult["data"].length > 0){
          var signCont = JSON.parse(JSON.stringify(authResult["data"][0]));

          if(signCont["result"] == "success"){
            this.saveSerialNumParm(serialNum,item, 2);

          }
          else{
            this.saveSerialNumParm(serialNum,item, 3);

          }
          let resultSign = signCont["resultSign"];
          delete signCont["resultSign"];

          this.dataManager.addSignCont(resultSign, signCont);

        }
      }
     }
  }).catch(error => {

  });
}

saveSerialNumParm(serialNum,item, pathStatus){
  let masterWalletId = Config.getCurMasterWalletId();

  item["pathStatus"] = pathStatus;
   this.idsObj[masterWalletId][this.parmar["id"]][this.parmar["path"]][serialNum]= item;
   this.localStorage.setKyc(this.idsObj).then(()=>{

     if(item["pathStatus"]  == 2) {
       this.Go(PersonWriteChainPage, item);
     }
   });
}
}
