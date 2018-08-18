package com.plugin.appmanager;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.PluginResult;
import org.elastos.desktop.AppActivity;
import org.elastos.desktop.WalletAppActivity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import io.ionic.starter.MainActivity;


/**
 * This class echoes a string called from JavaScript.
 */
public class appmanager extends CordovaPlugin {

  public String TAG = "Elastos.appmanager";

  private static CallbackContext mCallbackContext;

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals("StartApp")) {
      mCallbackContext = callbackContext;
      String message = args.getString(0);
      this.StartApp(message, callbackContext);
      return true;
    }
    return false;
  }

  private void StartApp(String message, CallbackContext callbackContext) {
    Log.e("Elastos", message);
    if (message != null && message.length() > 0) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {

          Intent mIntent = new Intent();
          if (message.equalsIgnoreCase("www/index.html")) {
            //Intent mIntent = new Intent(cordova.getActivity(), MainActivity.class);
            mIntent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
            mIntent.setData(Uri.parse("main://main?action=20&url=" + message));
            //cordova.getActivity().startActivity(mIntent);
          } else if (message.contains("wallet")) {
            //Intent mIntent = new Intent(cordova.getActivity(), WalletAppActivity.class);
            mIntent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
            mIntent.setData(Uri.parse("wallet://wallet?action=20&url=" + message));
            //cordova.getActivity().startActivity(mIntent);
          } else {
            //Intent mIntent = new Intent(cordova.getActivity(),AppActivity.class);
            // mIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            mIntent.setData(Uri.parse("elastos://elastos?action=21&url=" + message));
            //cordova.getActivity().startActivity(mIntent);
          }
          mIntent.setPackage("org.elastos.desktop");
          cordova.getActivity().startActivity(mIntent);
        }
      });
      callbackContext.success(message);
    } else {
      callbackContext.error("Expected one non-empty string argument.");
    }
  }

  @Override
  public void onNewIntent(Intent intent) {
    //Intent tempintent = getIntent();
    Log.e(TAG, "intent: " + intent);
    if (null != intent) {
      Uri data = intent.getData();
      if (null != data) {
        String scheme = data.getScheme();
        String host = data.getHost();
        if (scheme.equals("wallet") && host.equals("wallet")) {
            String path = data.toString();
            int urlindex = path.indexOf("url=");
            String url = path.substring(urlindex + 4);
            String message = "handle.OnPlugInMessage('" + url + "')";
            PluginResult dataResult = new PluginResult(PluginResult.Status.OK, message);
            dataResult.setKeepCallback(true);// 非常重要
            mCallbackContext.sendPluginResult(dataResult);
        }
      }
    }
  }
}

