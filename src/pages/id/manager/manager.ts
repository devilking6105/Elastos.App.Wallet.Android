import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {Config} from "./../../../providers/Config";

/**
 * Generated class for the LauncherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-manager',
  templateUrl: 'manager.html',
})
export class IdManagerComponent extends BaseComponent implements OnInit{
  public kycIdArr:any=[];
  public isSelectObj:any={};
  masterWalletId = "0";
  selectAll = false;
  public backupWalletPlainText:any;
  idsObj:any;
  ngOnInit(){
    this.masterWalletId = Config.getCurMasterWalletId();
    this.setTitleByAssets('text-id-manager');
        this.localStorage.getKyc().then((val)=>{
        if(val === null){
          this.kycIdArr = [];
        }else{
          this.kycIdArr = this.objtoarr(JSON.parse(val)[this.masterWalletId]);
          this.idsObj = JSON.parse(val);
        }
      });

      this.setLeftIcon("",()=>{
        this.events.publish("idhome:update");
        this.Back();
      });
  }

  onItem(id){

      if(this.isNull(this.isSelectObj[id])){
        this.isSelectObj[id] = true;
        this.selectAll=this.setAllButton();
        return;
      }
      this.isSelectObj[id] = !this.isSelectObj[id];
      this.selectAll=this.setAllButton();
  }

  onNext(type){

    switch (type){

      case 1:   //导出
         let improtids = this.getSelsetId();
         this.downButton(improtids);
        break;
      case 2:   //删除
      let delids = this.getSelsetId();
      console.log(JSON.stringify(delids));
      this.delIds(delids);
        break;
      case 3:
        this.selectAll = !this.selectAll;
        this.setSelectAll(this.selectAll);
        break;
    }
  }

  setSelectAll(stauts)
  {
     for(let key in this.idsObj[this.masterWalletId]){
       this.isSelectObj[key] = stauts;
     }
  }

  getSelsetId(){
    let arr = [];
    for(let key in this.isSelectObj){
        if(this.isSelectObj[key]){
          arr.push(key);
        }
    }
    return arr;
  }

  setAllButton(){
    let isCheck:any=true;
    if(Object.keys(this.isSelectObj).length < this.kycIdArr.length){
      isCheck = false;
      return isCheck;
    }
    for(let key in this.isSelectObj){
        if(!this.isSelectObj[key]){
             isCheck = false;
             return isCheck;
        }
    }
        return isCheck;
  }

  downButton(ids){
    let masterWalletId = Config.getCurMasterWalletId();

    if(ids.length===0){
      this.messageBox("text-down-please-message");
         return;
    }
     let idsObj = {};
     idsObj[masterWalletId] ={};

     let kycObj = this.idsObj[masterWalletId];
     for(let id in ids){
      let key =ids[id];
      idsObj[masterWalletId][key] = kycObj[key];
     }
     this.backupWalletPlainText = JSON.stringify(idsObj);
  }

  onCopay(){
    this.native.copyClipboard(this.backupWalletPlainText).then(()=>{
             this.toast('text-copied-to-clipboard');
    }).catch(()=>{

    });
  }

  delIds(ids){
    let masterWalletId = Config.getCurMasterWalletId();

    if(ids.length===0){
        this.messageBox("text-id-kyc-import-text-del-please-message");
           return;
      }
      for(let id in ids){
        let key =ids[id];
        delete this.idsObj[masterWalletId][key];
      }

      // let obj ={};
      // let masterWalletId = Config.getCurMasterWalletId();
      // obj[masterWalletId] = this.idsObj;
      this.localStorage.setKyc(this.idsObj).then(()=>{
               this.kycIdArr = this.objtoarr(this.idsObj);
               this.messageBox('text-id-kyc-import-text-del-message');
      });
  }
}
