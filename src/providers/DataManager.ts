import {Injectable} from '@angular/core';





/***
 * 封装配置信息
 */
@Injectable()
export class DataManager {

  //map key is signature value is jsonObj (with seqnum and so on)
  public  SignSeqNumObjetMap = {};

  // ID all three Path Json
  public  idPathJson = {};

  //key is proof signature, value is  kyc auth content
  public  kycSignCont = {}


  public  addIdPathJson(Id: string, Path : string , objJson : any){

    if (!this.idPathJson[Id]){
      this.idPathJson[Id] = {};
    }

    console.info("ElastosJs DataManager addIdPathJson Id "+ Id +" Path" + Path + "objJson "+ JSON.stringify(objJson));

    if (!this.idPathJson[Id][Path]){
      this.idPathJson[Id][Path] =[]
    }
    this.idPathJson[Id][Path].push(objJson);
    console.info("ElastosJs DataManager addIdPathJson end Id "+ Id +" Path" + Path + "objJson "+ JSON.stringify(objJson));

  }

/*
* [{
* 	"hash": "d2a1cb8a0d2ba5250da735005a85c4238012b0e745fea415c66381605fb77379",
* 	"KycContent": {
* 		"fullName": "宋家准",
* 		"identityNumber": "410426198811151012"
* 	},
* 	"Proof": "{\"signature\":\"3044022034e37b66a9310cfae15f06d684c2e4af2b923bedf0d8261a78a835ff2e531a6b022060c79582f35ab4171cba03b40dd93e9b16e349d3c58f96dd55a6b4629a174fd2\",\"notary\":\"COOIX\"}"
* }]
* 注意jsonObj 为上面这种格式。 友情提示，是个数组。
*
* */
  public  getIdPathJson(Id: string, Path : string ){

    let jsonObj = {};
    console.info("ElastosJs DataManager getIdPathJson begin Id "+ Id +" Path" + Path );

    if (this.idPathJson[Id]){
      jsonObj = this.idPathJson[Id][Path];
    }
    console.info("ElastosJs DataManager getIdPathJson end jsonObj "+ JSON.stringify(jsonObj) );

    return jsonObj;
  }

  public OutPutIDJson(Id: string, Path : string , signature: string){
    let idJson = {};

    let jsonObj = this.getIdPathJson(Id, Path);

    //if( (jsonObj["Contents"].length > 0) && (jsonObj["Contents"][0]["Values"].length > 0)){
      //let proofObj = JSON.parse(jsonObj["Contents"][0]["Values"][0]["Proof"] );
      let signCont = this.getSignCont(signature)

      idJson["Id"] = Id;
      idJson["Path"] = Path;
      idJson["SignContent"] = signCont;
      //idJson["DataHash"] = [];

      idJson["DataHash"] = (jsonObj)

      console.info("Elastjs OutPutIDJson " + JSON.stringify(idJson));
      return idJson;
    //}

  }

/*{
  "type": "identityCard",
  "result": "success",
  "retdata": {
    "app": "b1c0b7028c8c4be3beafc4c4812ae92e",
    "identityNumber": "410426198811151012",
    "signature": "b346391e4d008a2e0f0a0d9f40c0a20d3280588f1a575494bd0043691c904f79823ea10aa4d2caf126d9a374e6871e4dbf326e2824b0f73c5a2a337255eed680",
    "fullName": "宋家准",
    "authid": "12345678",
    "ts": "1536116196"
  },
  "message": "认证成功",
  "timestamp": "1536116303305"
}

注意 cont内容为上面这种。
*/
  public  addSignCont(sign: string , cont : any){
    console.info("ElastosJs DataManager addSignCont sign "+ sign + "cont "+ JSON.stringify(cont));

    this.kycSignCont[sign] = cont;
  }

  public  getSignCont(sign: string){
    console.info("ElastosJs DataManager getSignCont sign "+ sign + "obj "+ JSON.stringify(this.kycSignCont[sign]));

    return this.kycSignCont[sign];
  }


  //add obj
  public  addSeqNumObj(sign :string , obj : any ){
    console.info("ElastosJs DataManager addSeqNumObj sign "+ sign + "obj "+ JSON.stringify(obj));

    this.SignSeqNumObjetMap[sign] = obj;
  }

  //get object
  public  getSeqNumObj(sign : string){
    console.info("ElastosJs DataManager getSeqNumObj sign "+ sign + "obj "+ JSON.stringify(this.SignSeqNumObjetMap[sign]));
    return this.SignSeqNumObjetMap[sign];
  }



}


