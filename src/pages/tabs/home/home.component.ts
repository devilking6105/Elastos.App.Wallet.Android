import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {CoinComponent} from "../../coin/coin.component";
import {CoinListComponent} from "../../coin/coin-list/coin-list.component";
import {Config} from '../../../providers/Config';
import {PaymentConfirmComponent} from '../../coin/payment-confirm/payment-confirm.component';
import {DidLoginComponent} from "../../third-party/did-login/did-login.component";


declare let cordova: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {

  wallet = {
    name: 'myWallet',
    showBalance: true
  };
  ElaObj ={"name":"ELA","balance":0};
  coinList = []
  
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  
   //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      let exitmesage = this.translate.instant("text-exit-message");
      this.native.toast(exitmesage);
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
  
  
  ngOnInit() {	
	  this.platform.registerBackButtonAction(event => {
      console.log("=== ElastosJS  registerBackButtonAction click back btn");
          if (this.nav.canGoBack()) {
            this.nav.pop();
          } else {			  
             //cordova.plugins.appmanager.StartApp("www/index.html",
			//	function (data) {}, 
			//	function (error) {}); 
             this.showExit();
          }
    }, 101);

	
    if(this.dealwithargs()){
		return;
	}
	
    this.getAllMasterWallets();
    this.events.subscribe('home:update', () => {
           this.getElaBalance(this.ElaObj);
           this.localStorage.get('coinListCache').then((val)=>{
            let coinListCache = JSON.parse(val);
            this.coinList = [];
            for (let coin in coinListCache) {
              this.walletManager.getBalance(coin,(data)=>{
                this.coinList.push({name: coin, balance: data.balance/Config.SELA});
              })
            }
          });
    });


    // wallet name
    this.localStorage.getWallet().then((val) => {
      if (val) {
        this.wallet.name = val;
      }
    });

   }

  onOpen() {
    this.wallet.showBalance = !this.wallet.showBalance;
  }

     dealwithargs() {
	 let type = null;
	 //let value =  this.localStorage.get('login_type');
	 this.localStorage.get('login_type').then((value)=>{
		 type = JSON.parse(value).login_type
		 console.info( "ElastosJs  dealwithargs:" + type);
		 this.localStorage.remove('login_type');
		if (type == 'payment') {
			this.localStorage.get('payment').then((val)=>{
			  if (val) {
				console.log('ElastosJs' +JSON.parse(val));
				this.localStorage.remove('payment');
				this.Go(PaymentConfirmComponent, JSON.parse(val));
				return true;
			  }
			});
		 } else if (type == 'did_login') {		 
			 //this.Go(DidLoginComponent);
			 //return true;
			 this.localStorage.get('did_login').then((val)=>{
			  if (val) {
				console.log('ElastosJs' +JSON.parse(val));
				this.localStorage.remove('did_login');
				this.Go(DidLoginComponent, JSON.parse(val));
				return true;
			  }
			});
		 }
	 });
	
	 return false;
  }
  

  onClick(type){
    switch (type){
      case 0:
        this.native.scan().then((q)=>{
         //this.Go(TransferComponent,{address:q.qrcode});
        }).catch(err=>{
          this.toast('error-address');
        });
        break;
      case 1:
        this.Go(CoinListComponent);
        break;
    }
  }

  onItem(item) {
    this.Go(CoinComponent, {name: item.name});
  }

  getElaBalance(item){
    this.walletManager.getBalance(item.name,(data)=>{
      this.ElaObj.balance = data.balance/Config.SELA;
    })
  }

  getAllMasterWallets(){
    this.walletManager.getAllMasterWallets((result)=>{
      this.getAllSubWallets();
    });
  }

  getAllSubWallets(){
    this.walletManager.getAllSubWallets(()=>{
     this.getElaBalance(this.ElaObj);
         // wallet balance
    this.localStorage.get('coinListCache').then((val)=>{
      let coinListCache = JSON.parse(val);
      for (let coin in coinListCache) {
         this.getSubBalance(coin);
      }
    });
    })
  }

  getSubBalance(coin){
    this.walletManager.getBalance(coin, (data)=>{
      this.coinList.push({name: coin, balance: data.balance/Config.SELA});
    })
  }
 
  
}

