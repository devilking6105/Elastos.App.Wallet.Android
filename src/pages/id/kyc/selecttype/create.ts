import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdKycPersonComponent} from "../../../../pages/id/kyc/person/person"
import {IdKycCompanyComponent} from "../../../../pages/id/kyc/company/company"
import {IdResultComponent} from "../../../../pages/id/result/result";
import {IdKycResultComponent} from "../../../../pages/id/kyc/result/result";
import {IDManager} from "../../../../providers/IDManager";
import {ApiUrl} from "../../../../providers/ApiUrl";
@Component({
  selector: 'kyc-select-type',
  templateUrl: 'create.html',
})
export class kycSelectTypeComponent extends BaseComponent implements OnInit{
  idObj:any;
  serialNum:string;
  txHash:string;
  vtoken:string;
  createData = {
    createType: 1,   //1 个人  2企业
  };
  idsObj={};
  finshData;
  status:number=0;
  onChange(type){
    this.createData.createType = type;
  }

  ngOnInit(){
    this.idObj = this.getNavParams().data;
    this.setTitleByAssets('text-id-type');
    this.localStorage.get("kyc").then((val)=>{
            this.idsObj = JSON.parse(val);
            this.serialNum = this.idsObj["serialNum"];
            this.vtoken = this.idsObj["vtoken"];
            this.txHash = this.idsObj["txHash"];
            this.getAppAuth();
    });
  }

  onCommit(){
    this.createDID();
  }


  createDID(){
    let id = this.idsObj["id"];
  if( this.createData.createType === 1){
    if(this.isNull(id)){
      this.Go(IdKycPersonComponent,this.idObj);
    }

    if(this.status==0){
      this.Go(IdResultComponent,{'status':'0'});
      return;
     }

     if(this.status==1){
       this.Go(IdKycResultComponent);
       return;
    }
  }else if(this.createData.createType === 2){
    if(this.isNull(id)){
     this.Go(IdKycCompanyComponent,this.idObj);
     return;
    }

    if(this.status==0){
      this.Go(IdResultComponent,{'status':'0'});
     return;
    }

    if(this.status==1){
      this.Go(IdKycResultComponent);
      return;
     }
  }
  }

  getAppAuth(){
    let timestamp = this.getTimestamp();
    let parms ={"serialNum":this.serialNum,
                "txHash":"64a3d36afa4d5e45cd4aa6fab3c2c9f2c26c8d90b1784e994819f573b7488704",
                "vtoken":this.vtoken,
                "timestamp":timestamp,
               }
    let checksum = IDManager.getCheckSum(parms,"asc");
    parms["checksum"] = checksum;
    this.getHttp().postByAuth(ApiUrl.APP_AUTH,parms).toPromise().then(data => {
      if(data["status"] === 200){
        console.log("sssss======="+JSON.stringify(data));
        let authResult = JSON.parse(data["_body"]);
        this.finshData = authResult["data"] || "";
        this.idsObj["vtoken"] = authResult["vtoken"];
        if(this.isNull(this.finshData)){
            this.status = 0;
        }else{
            this.status = 1;
            this.idsObj["status"] = 1
        }
        this.localStorage.add("kyc",this.idsObj);
       }
    }).catch(error => {

    });
  }

}
