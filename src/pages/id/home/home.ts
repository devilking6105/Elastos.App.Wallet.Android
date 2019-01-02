import { Component,ViewChild} from '@angular/core';
import {IdImportComponent} from "../../../pages/id/import/import";
import {IdManagerComponent} from "../../../pages/id/manager/manager";
import {TabsComponent} from "../../../pages/tabs/tabs.component";
import { Config } from '../../../providers/Config';
import {PathlistPage} from '../../../pages/id/pathlist/pathlist';
import {IDManager} from "../../../providers/IDManager";
import { NavController, NavParams,Events,Navbar} from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {DataManager} from "../../../providers/DataManager";
import {Util} from "../../../providers/Util";
@Component({
  selector: 'id-home',
  templateUrl: 'home.html',
})
export class IdHomeComponent{
  public kycIdArr:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public navParams: NavParams,public native :Native,public walletManager :WalletManager,public localStorage: LocalStorage,public events: Events,public dataManager :DataManager){
          this.init();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e)=>{

      console.info("ElastosJs IdHomeComponent setRootRouter");

      this.native.setRootRouter(TabsComponent);
    };
  }
  init(){
    var self = this;
    this.localStorage.getKyc().then((val)=>{

             console.info("ElastosJs IdHomeComponent begin" + val);
             let seqNumJsonObj = JSON.parse(val);

             let masterWalletId = Config.getCurMasterWalletId();

      this.kycIdArr = Util.objtoarr(seqNumJsonObj[masterWalletId]);


             console.info("ElastosJs IdHomeComponent val" + val);
             console.info("ElastosJs IdHomeComponent this.kycIdArr" + JSON.stringify(this.kycIdArr));
             console.info("ElastosJs IdHomeComponent length" + this.kycIdArr.length);

              self.initSeqObj(seqNumJsonObj);

             this.kycIdArr.forEach(function(e){
               console.info("ElastosJs IdHomeComponent e.id registerIdListener begin  " + e.id);
               self.walletManager.registerIdListener(Config.getCurMasterWalletId() , e.id, (data) => {

                 console.info("home.ts ElastosJs ngOnInit registerIdListener data "+ JSON.stringify(data));

                 alert("ElastosJs IdHomeComponent home.ts registerIdListener "+ JSON.stringify(data));
                 //alert("home.ts createDID registerIdListener  data  callback"+ JSON.stringify(data));
                 //first commit
                 if(data["confirms"] == 0){

                   let valueObj = JSON.parse(data["value"]) ;

                   console.info("home.ts ElastosJs ngOnInit registerIdListener valueObj "+ JSON.stringify(valueObj));
                   //console.info("home.ts ElastosJs ngOnInit registerIdListener valueObj[\"Contents\"].length  "+ valueObj["Contents"].length);
                   //console.info("home.ts ElastosJs ngOnInit registerIdListener Proof "+ valueObj["Contents"][0]["Values"][0]["Proof"] );

                   if((valueObj["Contents"].length > 0) && (valueObj["Contents"][0]["Values"].length > 0) && valueObj["Contents"][0]["Values"][0]["Proof"] ){

                     let proofObj = JSON.parse(valueObj["Contents"][0]["Values"][0]["Proof"] );

                     console.info("home.ts ElastosJs ngOnInit proofObj[\"signature\"]  "+ proofObj["signature"]);
                     let seqNumObj = self.dataManager.getSeqNumObj(proofObj["signature"]);

                     let serialNum =  seqNumObj["serialNum"] ;
                     console.info("home.ts ElastosJs ngOnInit serialNum "+ serialNum);

                     ////

                     let arrPath = valueObj["Contents"][0]["Path"].split("/");

                     if (arrPath && arrPath[1]){
                       let  idJson = self.dataManager.OutPutIDJson(data.id, valueObj["Contents"][0]["Path"], proofObj["signature"]);
                       self.localStorage.addKeyToSerialNum(Config.getCurMasterWalletId(), data.id, arrPath[1], serialNum, "idJson", idJson, function(){
                         self.setOrderStatus(5,serialNum,function () {
                           self.addOnChainContent(valueObj, arrPath[1]);
                         });

                       });
                       self.testDataHash(idJson);
                     }

                     ////


                    // self.dataManager.addIdPathJson(data.id, valueObj["Contents"][0]["Path"], valueObj);
                   }
                 }
                 //alert("home.ts createDID registerIdListener ngOnInit data  callback"+ JSON.stringify(data));
                 //console.info("home.ts ElastosJs createDID registerIdListener " + JSON.stringify(data));

                 console.info("home.ts ElastosJs ngOnInit registerIdListener  data  callback !!!!!" + JSON.stringify(data));

               });
               console.info("ElastosJs IdHomeComponent e.id  end registerIdListener" + e.id);
              });


    });

    this.events.subscribe('idhome:update', () => {

      this.localStorage.getKyc().then((val)=>{
        let masterWalletId = Config.getCurMasterWalletId();
        let kycObj = JSON.parse(val);
        this.kycIdArr = Util.objtoarr(kycObj[masterWalletId]);

      });
    });
  }

  testDataHash(IDJsonObj){

    // let IDJsonObj = {
    //   "Id": "ihWrYTvJ4FYHBuQ5mwmTNTVXenSfvWHDy9",
    //   "Path": "kyc/enterprise",
    //   "SignContent": {
    //     "type": "enterprise",
    //     "result": "success",
    //     "retdata": {
    //       "app": "b1c0b7028c8c4be3beafc4c4812ae92e",
    //       "signature": "4a2e50905a55e1b6156410e360c083c0a85cad0ef1f089d8a6eea87a8f1e225d74cefcaea92c69ad7c4a77c53dccc4b5fa090019200e5fda4c505ba4eccbc612",
    //       "RegistrationNum": "911101080804655794",
    //       "legalPerson": "詹克团",
    //       "word": "北京比特大陆科技有限公司",
    //       "authid": "12345678",
    //       "ts": "1535103449"
    //     },
    //     "message": "认证成功",
    //     "timestamp": "1535103453088"
    //   },
    //   "DataHash": [{
    //     "hash": "7f6d1d62480d06e939999f33cc9f3802602236dccfb8243a2e74176b9fb905ab",
    //     "KycContent": {
    //       "word": "北京比特大陆科技有限公司",
    //       "legalPerson": "詹克团",
    //       "registrationNum": "911101080804655794"
    //     },
    //     "Proof": "{\"signature\":\"3046022100fb11acd29f09ca0b3d7d64d3baa1eb462aa31ecbf6e36d2950ea75d22b349793022100ee3e38132242a229e093b7ec10305b5104a35c0cdc2c30c8230524eabbfeb32c\",\"notary\":\"COOIX\"}"
    //   }]
    // };

    let DataHashArry =IDJsonObj["DataHash"];
    let DataHashElement = DataHashArry[0];
    console.info("Elastjs testDataHash DataHashElement " + JSON.stringify(DataHashElement));

    let valueObj = {};
    valueObj["Proof"] = DataHashElement["Proof"];


    let kycContent = DataHashElement["KycContent"];

    console.info("Elastjs testDataHash kycContent " + JSON.stringify(kycContent));
    console.info("Elastjs testDataHash valueObj[\"proof\"] " + valueObj["Proof"]);


    let authDataHash = IDManager.hash(JSON.stringify(kycContent)+valueObj["Proof"]);

    valueObj["DataHash"] = IDManager.hash(authDataHash+valueObj["Proof"]);

    console.info("ElastJs testDataHash DataHash " + valueObj["DataHash"] + " targetHash " + IDJsonObj["DataHash"][0]["hash"]);
  }

  initSeqObj(allStoreSeqNumJsonObj){
    console.info("ElastosJs initSeqObj begin allStoreSeqNumJsonObj" + JSON.stringify(allStoreSeqNumJsonObj));
    var self = this;

    let ids = allStoreSeqNumJsonObj;
    for(let id in ids){
      let  idJsonObj = ids[id];
      if (! idJsonObj["kyc"]){
        continue;
      }

      for (let authType in idJsonObj["kyc"]){
        if (!idJsonObj["kyc"][authType]["order"]){
          continue
        }
        let order = idJsonObj["kyc"][authType]["order"];

        for (let prop in order) {

          if ( order[prop]["params"] && order[prop]["params"]["adata"])
          {
            var addataArry = [];
            addataArry = order[prop]["params"]["adata"];
            addataArry.forEach(function (value) {
              if (value && value["retdata"]) {
                if ( value["retdata"]["signature"]) {
                  let sign = value["retdata"]["signature"];
                  self.dataManager.addSeqNumObj(sign, order[prop] );
                 //console.info( "ElastosJs add sign " + sign + " obj "+ JSON.stringify(order[prop]));
                }
              }
            })
          }
        }
      }
    }
    console.info("ElastosJs initSeqObj end ");
  }

  onNext(type){
    switch (type){
      case 0:
        this.createDID();
        break;
      case 1:
        this.native.Go(this.navCtrl,IdImportComponent);
        break;
      case 2:
      this.native.Go(this.navCtrl,IdManagerComponent);
        break;
    }
  }

  onItem(item){
     //this.Go(IdAppListComponent,{"id":item.id});
     this.native.Go(this.navCtrl,PathlistPage,{"id":item.id});
  }

  createDID(){

    console.info("home.ts ElastosJs createDID begin ");
    //,"s12345678"
    this.walletManager.createDID(Config.getCurMasterWalletId(),(result)=>{

      if(!result.success){
        alert("home.ts createDID err"+ JSON.stringify(result));
        return ;
      }

      let idObj ={id:result.success};
      let self = this;

      console.info("home.ts ElastosJs createDID createDID "+ JSON.stringify(result));

      this.walletManager.registerIdListener(Config.getCurMasterWalletId(), result.success, (data) => {

        alert("ElastosJs IdHomeComponent home.ts createDID createDID registerIdListener "+ JSON.stringify(data));

        console.info("home.ts ElastosJs createDID registerIdListener "+ JSON.stringify(data));
        alert("home.ts createDID registerIdListener  data  callback"+ JSON.stringify(data));
        //first commit
        if(data["confirms"] == 0){

          let valueObj = JSON.parse(data["value"]) ;
          if((valueObj["Contents"].length > 0) && (valueObj["Contents"][0]["Values"].length > 0) && valueObj["Contents"][0]["Values"][0]["Proof"] ){

            let proofObj = JSON.parse(valueObj["Contents"][0]["Values"][0]["Proof"]);

            console.info("home.ts ElastosJs createDID valueObj  "+ JSON.stringify(valueObj));
            let seqNumObj = self.dataManager.getSeqNumObj(proofObj["signature"]);

            let serialNum =  seqNumObj["serialNum"] ;
            //console.info("home.ts ElastosJs createDID serialNum "+ serialNum);
            //self.setOrderStatus(5,serialNum);


            let arrPath = valueObj["Contents"][0]["Path"].split("/");

            if (arrPath && arrPath[1]){
              let  idJson = self.dataManager.OutPutIDJson(data.id,valueObj["Contents"][0]["Path"], proofObj["signature"]);
              self.localStorage.addKeyToSerialNum(Config.getCurMasterWalletId(),data.id,  arrPath[1], serialNum, "idJson", idJson, function(){

                self.setOrderStatus(5,serialNum ,function () {
                  self.addOnChainContent(valueObj, arrPath[1]);
                });

              });
              self.testDataHash(idJson);
            }
            // let  idJson = self.dataManager.OutPutIDJson(data.id, valueObj["Contents"][0]["Path"], proofObj["signature"]);
            // self.localStorage.addKeyToSerialNum(data.id, valueObj["Contents"][0]["Path"], serialNum, "idJson", idJson);
            // self.testDataHash(idJson);
            //


          }
        }

        //console.info("home.ts ElastosJs createDID registerIdListener " + JSON.stringify(data));

        console.info("home.ts ElastosJs createDID registerIdListener  data  callback !!!!!" + JSON.stringify(data));


      });


      this.localStorage.addKycKey(Config.getCurMasterWalletId(), idObj.id, idObj).then(()=>{
           this.kycIdArr.push({id:result.success});
      });
    });
  }


  getDID(){
    this.walletManager.getDIDList(Config.getCurMasterWalletId(),(result)=>{
      this.kycIdArr = JSON.parse(result["list"]);
    });
  }

  setOrderStatus(status,serialNum , callback : any){

    console.info("ElastJs setOrderStatus begin status " + status +" serialNum " + serialNum);

    let serids = Config.getSerIds();
    let serid = serids[serialNum];

    console.info("ElastJs setOrderStatus serid " + JSON.stringify(serid));
    console.info("ElastJs setOrderStatus serids " + JSON.stringify(serids));

    let did = serid["id"];
    let path = serid["path"];
    console.info("ElastJs setOrderStatus appr " + path);

    let idsObj = {};
    this.localStorage.getKyc().then((val)=>{

      console.info("ElastJs setOrderStatus getKycList " + val);
        if(val == null || val === undefined || val === {} || val === ''){
          console.info("ElastJs setOrderStatus getKycList err return ");

          return;
        }
      let masterWalletId = Config.getCurMasterWalletId();

      idsObj = JSON.parse(val);

      console.info("ElastJs setOrderStatus before chg status did "+ did + " path "+path + " serialNum "+ serialNum + " status "+ status);

      console.info("ElastJs setOrderStatus idsObj before chg----- " + JSON.stringify(idsObj));

      idsObj[masterWalletId][did][path][serialNum]["pathStatus"] = status;
      // if (idsObj[did]){
      //
      //   console.info("ElastJs setOrderStatus did ok"+ did);
      //   if (idsObj[did][path]){
      //     console.info("ElastJs setOrderStatus path ok"+ path);
      //     if (idsObj[did][path][serialNum]){
      //       console.info("ElastJs setOrderStatus serialNum ok"+ serialNum);
      //
      //       if (idsObj[did][path][serialNum]["pathStatus"]){
      //         console.info("ElastJs setOrderStatus pathStatus ok"+ idsObj[did][path][serialNum]["pathStatus"]);
      //
      //
      //       }
      //     }
      //   }
      //
      // }

      console.info("ElastJs setOrderStatus idsObj " + JSON.stringify(idsObj));

      this.localStorage.setKyc(idsObj).then(()=>{
          this.events.publish("order:update",status,path);

       console.info("ElastJs setOrderStatus pulish order ");
        callback();

     });
    });
}

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
