import {Config} from "../../../providers/Config" ;
import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {IdHomeComponent} from "../../../pages/id/home/home";

//import {Config} from "../../../providers/Config" ;

//import {Config} from "./../../../providers/config";
@Component({
  selector: 'id-create',
  templateUrl: 'create.html',
})
export class IdCreateComponent extends BaseComponent implements OnInit{

  createData = {
    password:'',
    rePassWord:''
  };

  ngOnInit(){
    this.setTitleByAssets('text-id-create');
  }

  onCommit(){
     if(this.isNull(this.createData.password)){
          this.messageBox('text-passworld-message');
          return;
     }
    if(this.isNull(this.createData.rePassWord)){
       this.messageBox('text-repassworld-message');
      return;
    }
    if(this.createData.password != this.createData.rePassWord){
      this.messageBox('text-passwold-dif');
      return;
    }

    this.createDID();
  }

  tiaozhuan(){
     this.Go(IdHomeComponent);
  }

  createDID(){
    //Config.getCurMasterWalletId()
    console.info("create.ts ElastosJs createDID begin ");
    //this.createData.password,
    this.walletManager.createDID(Config.getCurMasterWalletId(), (result)=>{
                    //alert("===2222ssss222222===="+JSON.stringify(result));
                    console.info("create.ts ElastosJs createDID  "+ result);
                    this.tiaozhuan();
    });
  }

}
