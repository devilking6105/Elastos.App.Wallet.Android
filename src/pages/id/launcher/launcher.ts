import { Component} from '@angular/core';
import {IdImportComponent} from "../../../pages/id/import/import";
import {IdHomeComponent} from "../../../pages/id/home/home";
import {Config} from "../../../providers/Config";
import { NavController, NavParams,Events } from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {DataManager} from "../../../providers/DataManager";

@Component({
  selector: 'id-launcher',
  templateUrl: 'launcher.html',
})
export class IdLauncherComponent{

  constructor(public navCtrl: NavController,public navParams: NavParams,public native :Native,public walletManager :WalletManager,public localStorage: LocalStorage,public events: Events,public dataManager :DataManager){

  }
  onNext(type){
    switch (type){
      case 0:
        this.createId();
        break;
      case 1:
        this.native.Go(this.navCtrl,this,IdImportComponent);
        break;
    }
  }

  createId(){
    let self = this;

    console.info("launcher.ts ElastosJs createId begin ");

    //,"s12345678"
    this.walletManager.createDID(Config.getCurMasterWalletId(),(result)=>{

          if(!result.success){
            alert("launcher.ts createDID err"+ JSON.stringify(result));
            return ;
          }

          let idObj ={id:result.success};


          console.info("ElastosJs luncher.ts createDID result add registerIdListener" + JSON.stringify(result));
          self.walletManager.registerIdListener(Config.getCurMasterWalletId(),result.success, (data) => {

            console.info("lacucher.ts ElastosJs createDID registerIdListener "+ JSON.stringify(data));
            alert("ElastosJs  lacucher.ts createDID createDID registerIdListener "+ JSON.stringify(data));

            //alert("home.ts createDID registerIdListener  data  callback"+ JSON.stringify(data));
            //first commit
            if(data["confirms"] == 1){

              let valueObj = JSON.parse(data["value"]) ;
              if((valueObj["Contents"].length > 0) && (valueObj["Contents"][0]["Values"].length > 0) && valueObj["Contents"][0]["Values"][0]["Proof"] ){

                let proofObj = JSON.parse(valueObj["Contents"][0]["Values"][0]["Proof"]);

                console.info("lacucher.ts ElastosJs createDID proofObj[\"signature\"]  "+ proofObj["signature"]);
                let seqNumObj = self.dataManager.getSeqNumObj(proofObj["signature"]);

                let serialNum =  seqNumObj["serialNum"] ;
                console.info("lacucher.ts ElastosJs createDID serialNum "+ serialNum);
                //self.setOrderStatus(5,serialNum);
                let arrPath = valueObj["Contents"][0]["Path"].split("/");

                if (arrPath && arrPath[1]){
                  let  idJson = self.dataManager.OutPutIDJson(data.id, valueObj["Contents"][0]["Path"] , proofObj["signature"]);
                  self.localStorage.addKeyToSerialNum(Config.getCurMasterWalletId(), data.id, arrPath[1], serialNum, "idJson", idJson, function(){
                    self.setOrderStatus(5,serialNum,function () {
                      self.addOnChainContent(valueObj, arrPath[1]);
                    });

                  });
                }

                // let idJson =self.dataManager.OutPutIDJson(data.id, valueObj["Contents"][0]["Path"], proofObj["signature"]);
                // self.localStorage.addKeyToSerialNum(data.id, valueObj["Contents"][0]["Path"], serialNum, "idJson", idJson);

              }
            }
            //console.info("home.ts ElastosJs createDID registerIdListener " + JSON.stringify(data));

            console.info("lacucher.ts ElastosJs createDID registerIdListener  data  callback !!!!!" + JSON.stringify(data));


          });
//<<<<<<< HEAD
          this.localStorage.addKycKey(Config.getCurMasterWalletId(), idObj.id,idObj).then(()=>{
               this.native.Go(this.navCtrl, IdHomeComponent);
// =======
//           this.localStorage.add("kycId",idObj).then(()=>{
//                this.native.Go(this.navCtrl,IdHomeComponent);
// >>>>>>> origin/wallet_dev
          });
    })
  }

  setOrderStatus(status,serialNum, callback : any){

    console.info("setOrderStatus begin status " + status +" serialNum " + serialNum);

    let serids = Config.getSerIds();
    let serid = serids[serialNum];

    console.info("setOrderStatus serid" + JSON.stringify(serid));
    console.info("setOrderStatus serids" + JSON.stringify(serids));

    let did = serid["id"];
    let path = serid["path"];
    console.info("setOrderStatus appr" + path);

    let idsObj = {};
    this.localStorage.getKyc().then((val)=>{
        if(val == null || val === undefined || val === {} || val === ''){
             return;
        }
     let masterWalletId = Config.getCurMasterWalletId();
     idsObj = JSON.parse(val);
     idsObj[masterWalletId][did][path][serialNum]["pathStatus"] = status;
     this.localStorage.setKyc(idsObj).then(()=>{
          this.events.publish("order:update",status,path);
          callback();
     });
    });
}


/////////////
  /*
  * onChainConentObj 数据格式如下：
  {
    "Contents": [{
      "Path": "kyc/identityCard",
      "Values": [{
        "DataHash": "f0d2651ded79d60fee12658efd1e35eb8c5fa494e925615ad1ce2337d2fd61f0",
        "Proof": "{\"signature\":\"3045022100bef6e8a9ed9046676382aa7ed956e01591c7e8361549be95e60ae51ff21479a102203f9b1fb9e5ac2e1864f29a1276aa3ba95fbd877f54a3ff788d5c07034c965933\",\"notary\":\"COOIX\"}"
      }]
    }],
    "Id": "iiaoJBEq9j4b1ZBiMDZGCEqrCRdmZjbmEs",
    "Sign": "4099fd7ff6520b5c683dc01e729713753c22692dad26ca6a1f169c77a85feb3cbc73e751fba5f05f3ac190cce9ffbb45fefcdfbb40ad7a064aa013de91a90a6812"
   }
  *
  * */

  addOnChainContent(onChainConentObj : any , authType : string ){

    console.info("ElastJs home.ts begin addOnChainContent" + JSON.stringify(onChainConentObj) + " authType " + authType);
    let idsObj = {};
    this.localStorage.getKyc().then((val)=>{

      console.info("ElastJs addOnChainContent getKycList " + val);
      if(val == null || val === undefined || val === {} || val === ''){
        console.info("ElastJs addOnChainContent getKycList err return ");

        return;
      }
      let masterWalletId = Config.getCurMasterWalletId();

      idsObj = JSON.parse(val);

      //idsObj[masterWalletId][onChainConentObj.Id]
      if(!idsObj[masterWalletId][onChainConentObj.Id]["onChainContent"]){
        idsObj[masterWalletId][onChainConentObj.Id]["onChainContent"] ={};
      }

      idsObj[masterWalletId][onChainConentObj.Id]["onChainContent"][authType] = onChainConentObj;
      console.info("ElastJs addOnChainContent idsObj " + JSON.stringify(idsObj));

      this.localStorage.setKyc(idsObj).then(()=>{
        console.info("ElastJs addOnChainContent pulish order ");

      });
    });
  }

}


