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
            console.info(" import.ts ElastJs ngOnInit val" + val);
            if(this.isNull(val)){
               this.kycObj = {};
            }else{
               this.kycObj =JSON.parse(val);
            }
      })
  }

  onImport(){
    if(this.isNull(this.keyStoreContent)){
           this.messageBox("text-id-kyc-import-no-message");
           return;
    }
    let masterWalletId = Config.getCurMasterWalletId();
    let addObjs = JSON.parse(this.keyStoreContent);

    console.info(" import.ts ElastJs onImport" + this.keyStoreContent);

    for(let key in addObjs[masterWalletId]){
      this.kycObj[masterWalletId][key] =  addObjs[masterWalletId][key];
    }

    this.localStorage.setKyc(this.kycObj).then(()=>{
      this.messageBox('text-exprot-sucess-message');
      this.Go(IdHomeComponent);
    });
  }
}
