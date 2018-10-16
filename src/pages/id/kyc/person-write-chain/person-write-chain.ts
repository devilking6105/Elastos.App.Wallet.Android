import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdHomeComponent} from "../../../../pages/id/home/home";
import {IDManager} from "../../../../providers/IDManager";
import { Config } from '../../../../providers/Config';
import {config} from "ngx-weui/jweixin";
import {ScancodePage} from "../../../scancode/scancode";
import {TabsComponent} from "../../../tabs/tabs.component";
//{notary:"COOIX"}

@Component({
  selector: 'page-person-write-chain',
  templateUrl: 'person-write-chain.html',
})
export class PersonWriteChainPage extends BaseComponent implements OnInit{
  masterWalletId:string ="1";
  chianId = "IdChain";
  type: string;
  pageObj = {};
  personObj={
     fullName:'sss',
     identityNumber:'410426198811151012',
     mobile:'18210230496',
     cardNumber:'6225260167820399',
     cardMobile:'18210230496'
  }

  phoneObj={
    fullName:'sss',
    identityNumber:'410426198811151012',
    mobile:'18210230496'
  }

  debitObj={
    fullName:'sss',
    identityNumber:'410426198811151012',
    cardNumber:'6225260167820399',
    cardMobile:'18210230496'
  }

  message:any={Id:"",Path:"",Proof:"",DataHash:"",Sign:""};
  passworld:string="";
  programJson:string;
  fromAddress:string;
  fee:number;
  did:string;
  idObj:any={};
 depositTransaction:string;
 depositTransactionFee:number;
 signature:string;
 orderStatus = 0;
 serialNum = "";
 ngOnInit(){
   let self = this;
   this.masterWalletId = Config.getCurMasterWalletId();
   this.events.subscribe("order:update",(orderStatus,appr)=>{
     console.log("ElastJs ngOnInit  orderStatus "+orderStatus + " appr " + appr);

     if(appr != "enterprise"){

       self.orderStatus = orderStatus;//
       console.log("ElastJs ngOnInit 111 appr !=orderStatus "+orderStatus + " appr " + appr);

     }
   });
    this.setTitleByAssets('text-kyc-result');
    this.idObj = this.getNavParams().data;
    console.log("ElastJs ngOnInit idObj"+JSON.stringify(this.idObj));
   this.did = this.idObj["payObj"]["did"];

   console.info("ElastJs ngOnInit pathStatus " +this.idObj["pathStatus"])
    this.orderStatus = this.idObj["pathStatus"];
    this.serialNum = this.idObj["serialNum"];
    this.getPerson();
    if(this.isNull(status)){
      this.type = '0';
    }else{
      this.type = status;
    }
    this.setLeftIcon('',()=>{
      console.info("ElastJs ngOnInit go  IdHomeComponent" )

      this.Go(IdHomeComponent);
    });
   console.info("ElastJs ngOnInit end " )

 }
  getPerson(){

   // console.info("ElastJs getPerson person-write-chain.ts ngOnInit begin ")

    console.info("ElastJs getPerson person-write-chain.ts ngOnInit idObj " + JSON.stringify(this.idObj))


    this.pageObj = this.getPageObj(this.idObj["adata"]);
    let index = this.idObj["adata"].length-1;
    let adata = this.idObj["adata"][index];
    //let pesronObj = adata["retdata"];

    this.message["Path"] = adata["type"];

    console.info("ElastJs getPerson person-write-chain.ts ngOnInit end ")

    // this.approdType =  adata["type"];
    // if(this.message["Path"] === "identityCard"){
    //      this.personObj["fullName"] = pesronObj["fullName"];
    //      this.personObj["identityNumber"] = pesronObj["identityNumber"];
    //      this.signature = pesronObj["signature"];
    // }else if(this.message["Path"] === "phone"){
    //      this.phoneObj["fullName"] =  pesronObj["fullName"];
    //      this.phoneObj["identityNumber"] =  pesronObj["identityNumber"];
    //      this.phoneObj["mobile"] = pesronObj["mobile"];
    //      this.signature = pesronObj["signature"];
    // }else if(this.message["Path"] === "bankCard"){
    //     this.debitObj["fullName"] =  pesronObj["fullName"];
    //     this.debitObj["identityNumber"] =  pesronObj["identityNumber"];
    //     this.debitObj["cardNumber"] = pesronObj["cardNumber"];
    //     this.debitObj["cardMobile"] = pesronObj["mobile"];
    //     this.signature = pesronObj["signature"];
    // }

  }

  onCommit(){
    this.popupProvider.presentPrompt().then((val)=>{
      console.log("ElastJs---onCommit----"+JSON.stringify(val));

      if(this.isNull(val)){
                this.messageBox("text-id-kyc-prompt-password");
                return;
              }
              this.passworld = val.toString();
              this.caulmessageNew();
    }).catch(()=>{

    });
    //this.didGenerateProgram();
  }

  didGenerateProgram(){

    console.log("ElastJs---didGenerateProgram----"+"message="+JSON.stringify(this.message)+"passworld"+this.passworld);
    //console.log("---didGenerateProgram DataHash.length----"+ this.message.DataHash.length);
    //console.log("---didGenerateProgram----Sign.length"+ this.message.Sign.length);
    //console.log("---didGenerateProgram----Proof"+  this.message.Proof);
    //console.log("---didGenerateProgram----Proof"+ JSON.stringify(this.message.Proof) );

    this.walletManager.didGenerateProgram(Config.getCurMasterWalletId() ,this.did,JSON.stringify(this.message),this.passworld,(result)=>{

      console.log("ElastosJs didGenerateProgram result "+JSON.stringify(result));
      this.programJson  = result.success;
      this.createfromAddress();
    });
  }

  createfromAddress(){
    this.walletManager.createAddress(this.masterWalletId,"IdChain",(result)=>{
              this.fromAddress = result.address;
              this.cauFee();
    });
  }

  cauFee(){

    console.log("ElastosJs---cauFee--- persona-write-chain.ts"+" masterWalletId= "+this.masterWalletId+" message= "+JSON.stringify(this.message)+" programJson = "+this.programJson);

    //alert("createIdTransaction before" + this.fromAddress);
    this.walletManager.createIdTransaction(this.masterWalletId,"IdChain","",this.message,this.programJson,"","",(result)=>{
             console.log("ElastosJs createIdTransaction result =="+ JSON.stringify(result));

             //console.log("ElastosJs---createIdTransaction---"+"fromAddress="+this.fromAddress+"message="+JSON.stringify(this.message)+"programJson="+this.programJson);
            if(result['success']){
              let rawTransaction = JSON.parse(result['success']) ;
              console.log("ElastosJs createIdTransaction rawTransaction ==" + JSON.stringify(rawTransaction) );
              this.calculateTransactionFee(rawTransaction);
            }

     });
  }

  calculateTransactionFee(rawTransaction){
    console.log("ElastosJs calculateTransactionFee  begin" + JSON.stringify(rawTransaction));

    this.walletManager.calculateTransactionFee(this.masterWalletId,"IdChain", rawTransaction,10000, (data) => {
      console.log("ElastosJs calculateTransactionFee data=="+JSON.stringify(data));

      this.fee = data['success'];
      //console.log("Elastos 111111111111111");
      this.popupProvider.presentConfirm(this.fee/Config.SELA).then(()=>{
        console.log("ElastosJs calculateTransactionFee before sendRawTransaction");

        this.sendRawTransaction(rawTransaction);
      });

     });
  }
//////////////////////
  getKycContent( authData){

    let retContent = {};

    switch (authData.type)
    {
      case "identityCard":
        retContent["fullName"] = authData["retdata"]["fullName"];
        retContent["identityNumber"] = authData["retdata"]["identityNumber"];
        break;

      case "phone":
        retContent["fullName"] =  authData["retdata"]["fullName"];
        retContent["identityNumber"] =  authData["retdata"]["identityNumber"];
        retContent["mobile"] = authData["retdata"]["mobile"];
        break;

      case "bankCard":
        retContent["fullName"] =  authData["retdata"]["fullName"];
        retContent["identityNumber"] =  authData["retdata"]["identityNumber"];
        retContent["cardNumber"] = authData["retdata"]["cardNumber"];
        retContent["cardMobile"] = authData["retdata"]["mobile"];
        break;

      case "enterprise":
        retContent["word"] = authData["retdata"]["word"];
        retContent["legalPerson"] = authData["retdata"]["legalPerson"];
        retContent["registrationNum"] = authData["retdata"]["RegistrationNum"];
        break;
    }
    return retContent;
  }

  getcontent(authType, authData){

    let retContent = {};
    retContent["Path"] = 'kyc' +'/'+ authData["type"];
    retContent["Values"] =[];
    let proofObj = {
      signature : authData["resultSign"],
      notary : "COOIX"
    }
/////////////////

    let valueObj = {};
    valueObj["Proof"] = JSON.stringify(proofObj);


    let kycContent = this.getKycContent( authData);
    console.info("ElastJs company getcontent kycContent "+ JSON.stringify(kycContent));
    console.info("ElastJs company getcontent Proof "+ valueObj["Proof"]);

    let authDataHash = IDManager.hash(JSON.stringify(kycContent)+valueObj["Proof"]);

    valueObj["DataHash"] = IDManager.hash(authDataHash+valueObj["Proof"]);

    let idJsonPart = {};
    idJsonPart["hash"] = valueObj["DataHash"];
    idJsonPart["KycContent"] = kycContent;
    idJsonPart["Proof"] = valueObj["Proof"];
    this.dataManager.addIdPathJson(this.did, retContent["Path"], idJsonPart)

    console.info("ElastJs company getcontent retContent before push ");

    retContent["Values"].push(valueObj)
    console.info("ElastJs company getcontent retContent "+ JSON.stringify(retContent));
    return retContent;
    ////////////////
    // retContent["Proof"] = JSON.stringify(proofObj);
    //
    // console.info("getcontent Proof "+ retContent["Proof"]);
    //
    // let kycContent = this.getKycContent(authData);
    //
    // console.info("getcontent kycContent "+ JSON.stringify(kycContent));
    //
    // let authDataHash = IDManager.hash(JSON.stringify(kycContent)+retContent["Proof"]);
    // retContent["DataHash"] = IDManager.hash(authDataHash+retContent["Proof"]);
    //
    // console.info("getcontent retContent "+ JSON.stringify(retContent));

    //return retContent;
  }

  caulmessageNew(){

    //
    ///////////////////////
    let params = this.idObj;//
    let self = this;
    console.log("ElastJs caulmessageNew begin params  " +JSON.stringify(params));
    if (params.adata.length <= 0){

      console.log("ElastJs caulmessageNew  params error return  " +JSON.stringify(params));
      return ;
    }

    this.localStorage.getOnchainContent(Config.getCurMasterWalletId(), this.did, params.adata[0].type, function (OnChainContentArry) {

      console.log("ElastJs caulmessageNew getOnchainContent OnChainContentArry  " +JSON.stringify(OnChainContentArry));

      let signMessage= {};
      signMessage["Id"] = self.did ;//
      signMessage["Contents"] =[];

      let content ;
      for (let ele of params.adata) {
        content = self.getcontent(params.type , ele);
        signMessage["Contents"].push(content);
      }

      console.log("ElastJs caulmessageNew before concat  " + "signMessage" +JSON.stringify(signMessage));

      if (OnChainContentArry.length > 0){
        signMessage["Contents"][0]['Values'] = signMessage["Contents"][0]['Values'].concat(OnChainContentArry);
      }

      console.log("ElastJs caulmessageNew passworld "+self.passworld + " after concat signMessage" +JSON.stringify(signMessage));

      self.walletManager.didSign(Config.getCurMasterWalletId() ,self.did,JSON.stringify(signMessage),self.passworld,(result)=>{
        console.log("ElastJs caulmessageNew didSign result "+ result);

        if(!result["success"]){
          console.log("ElastJs caulmessageNew didSign serious error------------->"+JSON.stringify(result));
          return ;
        }
        self.message = {
          Id : self.did,
          Sign :result["success"],
          Contents: signMessage["Contents"],
        };

        self.didGenerateProgram();
      });
    })

  }
////////////////////////




  sendRawTransaction( rawTransaction){

    this.updateTxFee(rawTransaction);

    // console.log("ElastosJs ---sendRawTransaction--- begin"+JSON.stringify(rawTransaction));
    //
    // alert("sendRawTransaction begin==");
    //
    // this.walletManager.sendRawTransaction(this.masterWalletId,"IdChain",rawTransaction,rawTransaction,this.passworld,(result)=>{
    //
    //
    //   let rawTransactionObj = JSON.parse(rawTransaction);
    //
    //   console.log("ElastosJs person-write-chain.ts ---sendRawTransaction---"+"rawTransaction="+JSON.stringify(rawTransactionObj)+"fee="+this.fee);
    //   //console.log("ElastosJs ---sendRawTransaction--- PayLoad"+ JSON.stringify(rawTransactionObj.PayLoad));
    //
    //   if (!rawTransactionObj.PayLoad) {
    //     console.log("ElastosJs ---sendRawTransaction--- PayLoad NULL");
    //     return;
    //   }
    //
    //   if (!rawTransactionObj["PayLoad"]["Contents"]){
    //     console.log("ElastosJs ---sendRawTransaction--- Contents NULL");
    //     return ;
    //   }
    //
    //   for (let ele of rawTransactionObj["PayLoad"]["Contents"] ) {
    //
    //     console.log("ElastosJs person-write-chain.ts ---sendRawTransaction--- ele " + JSON.stringify(ele));
    //     let arr = ele["Path"].split("/");
    //
    //     if (arr[1]) {
    //
    //
    //       let self = this;
    //       //iterat values
    //       for (let valueObj of ele["Values"]){
    //         let proofObj = JSON.parse(valueObj["Proof"]);
    //
    //         this.localStorage.getSeqNumObj(proofObj["signature"], rawTransactionObj.PayLoad.Id, arr[1], function (reult : any) {
    //           console.info("ElastosJs reult " + JSON.stringify(reult) );
    //           self.dataManager.addSeqNumObj(proofObj["signature"] , reult );
    //
    //         });
    //       }
    //       // let proofObj = JSON.parse(ele["Proof"]);
    //       // let self = this;
    //       //
    //       // this.localStorage.getSeqNumObj(proofObj["signature"], rawTransactionObj.PayLoad.Id, arr[1], function (reult : any) {
    //       //   console.info("ElastosJs reult" + JSON.stringify(reult) );
    //       //   self.dataManager.addSeqNumObj(proofObj["signature"] , reult );
    //       //
    //       // });
    //
    //
    //     }
    //   }
    //
    //   console.info("sendRawTransaction person-write-chain.ts setOrderStatus(4)")
    //   this.setOrderStatus(4);
    //   //this.messageBox("text-id-kyc-china");
    // })
  }


getPageObj(obj){
  let aprObj ={};

for(let index in obj){
 let data = obj[index];
 let retdata= data["retdata"];
 if(data["type"] === "identityCard"){
   aprObj["identityCard"] = {"identityNumber":retdata["identityNumber"],"fullName":retdata["fullName"]}
 }else if(data["type"] === "phone"){
   aprObj["phone"] = {"mobile":retdata["mobile"]};
 }else if(data["type"] === "bankCard"){
   aprObj["bankCard"] = {"cardMobile":retdata["mobile"],"cardNumber":retdata["cardNumber"]};
 }
}
 return aprObj;
}


// setOrderStatus(){
//   let serids = Config.getSerIds();
//   let serid = serids[this.serialNum];
//   let did = serid["id"];
//   let appName = serid["appName"];
//   let appr = serid["appr"];
//   let idsObj = {};
//   this.localStorage.getKycList("kycId").then((val)=>{
//       if(val == null || val === undefined || val === {} || val === ''){
//            return;
//       }
//    idsObj = JSON.parse(val);
//    idsObj[did][appName][appr]["order"][this.serialNum]["status"] = 2;
//    this.localStorage.set("kycId",idsObj).then(()=>{
//             this.orderStatus = 2;
//    });
//   });
// }
// }

/////////////////
  updateTxFee(rawTransaction){
    //this.chianId = "IdChain";

    this.walletManager.updateTransactionFee(this.masterWalletId,this.chianId ,rawTransaction, this.fee,(data)=>{
      if(data["success"]){
        console.log("ElastJs===updateTxFee===="+JSON.stringify(data));
        this.singTx(data["success"]);
      }else{
        alert("=====updateTransactionFee=error==="+JSON.stringify(data));
      }
    });
  }

  singTx(rawTransaction){
    this.walletManager.signTransaction(this.masterWalletId,this.chianId,rawTransaction,this.passworld,(data)=>{
      if(data["success"]){
        console.log("ElastJs===signTransaction===="+JSON.stringify(data));
        this.sendTx(data["success"]);
      }else{
        alert("=====signTransaction=error==="+JSON.stringify(data));
      }
    });
  }

  sendTx(rawTransaction){
    console.log("ElastJs sendTx===publishTransaction====rawTransaction"+rawTransaction);
    this.walletManager.publishTransaction(this.masterWalletId,this.chianId,rawTransaction,(data)=>{
      if(data["success"]){
        ////////////////////
        let rawTransactionObj = JSON.parse(rawTransaction);

        console.log("ElastosJs person-write-chain.ts ---sendRawTransaction---"+"rawTransaction="+JSON.stringify(rawTransactionObj)+"fee="+this.fee);

        if (!rawTransactionObj.PayLoad) {
          console.log("ElastosJs ---sendRawTransaction--- PayLoad NULL");
          return;
        }

        if (!rawTransactionObj["PayLoad"]["Contents"]){
          console.log("ElastosJs ---sendRawTransaction--- Contents NULL");
          return ;
        }

        for (let ele of rawTransactionObj["PayLoad"]["Contents"] ) {

          console.log("ElastosJs person-write-chain.ts ---sendRawTransaction--- ele " + JSON.stringify(ele));
          let arr = ele["Path"].split("/");

          if (arr[1]) {


            let self = this;
            //iterat values
            for (let valueObj of ele["Values"]){
              let proofObj = JSON.parse(valueObj["Proof"]);

              this.localStorage.getSeqNumObj(Config.getCurMasterWalletId(), proofObj["signature"], rawTransactionObj.PayLoad.Id, arr[1], function (reult : any) {
                console.info("ElastosJs reult " + JSON.stringify(reult) );
                self.dataManager.addSeqNumObj(proofObj["signature"] , reult );

              });
            }

          }
        }

        console.info("sendRawTransaction person-write-chain.ts setOrderStatus(4)")
        this.setOrderStatus(4);
        ///////////////////


        // console.log("ElastJs===publishTransaction===="+JSON.stringify(data));
        // this.txId = JSON.parse(data['success'])["TxHash"];
        // console.log("ElastJs=======sendRawTransaction======"+JSON.stringify(data));
        // console.log("=======this.appType======"+JSON.stringify(data));
        // if(this.isNull(this.appType)){
        //   console.log("===TabsComponent====");
        //   this.toast('send-raw-transaction');
        //   this.setRootRouter(TabsComponent);
        // }else if(this.appType === "kyc"){
        //   if(this.selectType === "enterprise"){
        //     this.company();
        //   }else {
        //     this.person();
        //   }
        // }

      }else{
        alert("=====signTransaction=error==="+JSON.stringify(data));
      }
    })
  }
/////////////////////
setOrderStatus(status){
  console.info("ElastJs setOrderStatus status begin" + status);
  let serids = Config.getSerIds();
  console.info("ElastJs setOrderStatus status serids" + JSON.stringify(serids));

  let serid = serids[this.serialNum];
  let did = serid["id"];
  let path = serid["path"];
  let idsObj = {};
  this.localStorage.getKyc().then((val)=>{
      if(val == null || val === undefined || val === {} || val === ''){
        console.info("ElastJs setOrderStatus val == null return ");
        return;
      }
   idsObj = JSON.parse(val);
   let masterWalletId = Config.getCurMasterWalletId();

    idsObj[masterWalletId][did][path][this.serialNum]["pathStatus"] = status;

    console.info("ElastJs setOrderStatus idsObj " + JSON.stringify(idsObj));

    this.localStorage.setKyc(idsObj).then(()=>{
     console.info("ElastJs setOrderStatus  end  status " + status);
            this.orderStatus = status;
   });
  });
}
}

