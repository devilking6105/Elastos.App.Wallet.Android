import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {IdHomeComponent} from "../../../pages/id/home/home";
import {Config} from "../../../providers/Config";


@Component({
  selector: 'id-import',
  templateUrl: 'import.html',
})
export class IdImportComponent extends BaseComponent implements OnInit{
  private kycObj:any={};
  keyStoreContent="";
  ngOnInit(){
      this.setTitleByAssets('text-id-import');
    let masterWalletId = Config.getCurMasterWalletId();

    this.localStorage.getKyc().then((val)=>{

            if(this.isNull(val)){
               this.kycObj = {};
            }else{
               this.kycObj =JSON.parse(val)[masterWalletId];
            }
      })
  }

  onImport(){
    if(this.isNull(this.keyStoreContent)){
           this.messageBox("text-id-kyc-import-no-message");
           return;
    }
    let addObjs = JSON.parse(this.keyStoreContent);
    for(let key in addObjs){
      this.kycObj[key] =  addObjs[key];
    }
    this.localStorage.setKyc(this.kycObj).then(()=>{
      this.messageBox('text-exprot-sucess-message');
      this.Go(IdHomeComponent);
    });
  }
}
