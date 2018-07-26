package com.elastos.carrier;

import android.util.Log;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

import io.ionic.starter.MyUtil;

public class Carrier extends CordovaPlugin {
  private CarrierClientAgent _carrier_client;
  private Util util;

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);

    util = new Util();
    _carrier_client = CarrierClientAgent.singleton();
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
    util.log("execute=============action="+action);
    try{
      switch (action) {
        case "init":
          this.init(args, callbackContext);
          this.start(args.getString(0), args.getString(1));
          return true;
//        case "connect":
//          this.start();
//          return true;
      }
    }catch(Exception e){
      e.printStackTrace();
      callbackContext.error(e.toString());
      return false;
    }

    return false;
  }

  public void init(JSONArray args, CallbackContext callbackContext){

    _carrier_client.setCallback(callbackContext);
    util.log("init carrier success");
  }

  public void start(String address, String password){
    _carrier_client.start(address, password);
    util.log("start connect carrier service, address="+address+" -- password="+password);
  }

  public static void close(){

    CarrierClientAgent.singleton().logout();
  }

}
