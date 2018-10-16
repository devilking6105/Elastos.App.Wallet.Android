package com.plugin.appmanager;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.PluginResult;
import org.elastos.desktop.AppActivity;
import org.elastos.desktop.WalletAppActivity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
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

  private static final int openwallet = 100;

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    //mCallbackContext = callbackContext;
    Log.e("Elastos execute:", this + "  "+ callbackContext  +" "+ action + args.toString());
    if (action.equals("StartApp")) {
        String message = args.getString(0);
        this.StartApp(message, callbackContext);
        return true;
    }
    return false;
  }

  private void StartApp(String message, CallbackContext callbackContext) {
    Log.e("Elastos StartApp", message);
    if (message != null && message.length() > 0) {
      //cordova.getActivity().runOnUiThread(new Runnable() {
      //  public void run() {
          Intent mIntent = new Intent();
          if (message.equalsIgnoreCase("www/index.html")) {
            //mIntent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
            mIntent.setData(Uri.parse("main://main?action=20&url=" + message));
            //cordova.getActivity().startActivity(mIntent);
          } else if (message.contains("wallet")) {
            //mIntent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
            mIntent.setData(Uri.parse("wallet://wallet?action=20&url=" + message));
            //cordova.getActivity().startActivity(mIntent);
          } else {
            //Intent mIntent = new Intent(cordova.getActivity(),AppActivity.class);
            // mIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            mIntent.setData(Uri.parse("elastos://elastos?action=21&url=" + message));
            //cordova.getActivity().startActivity(mIntent);
          }
          mIntent.setPackage("org.elastos.desktop");
          if(message.contains("backurlbackurl=")) {
              Log.e(TAG, "Elastos startActivityForResult "+  message);
              mCallbackContext = callbackContext;
              cordova.startActivityForResult(this, mIntent, openwallet);
              PluginResult dataResult = new PluginResult(PluginResult.Status.OK, message);
              dataResult.setKeepCallback(true);// 非常重要
              callbackContext.sendPluginResult(dataResult);
              return;
          } else if(message.contains("SetResult=wallet")) {
            cordova.getActivity().setResult(openwallet, mIntent);
            cordova.getActivity().finish();
           }else {
            cordova.getActivity().startActivity(mIntent);
          }
     //   }
      //});
           callbackContext.success(message);

    } else {
      callbackContext.error("Expected one non-empty string argument.");
    }
  }

  @Override
  public void onNewIntent(Intent intent) {
    //Intent tempintent = getIntent();
    Log.e(TAG, "onNewIntent: " + intent);
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
  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    Log.e(TAG, "onActivityResult: " + data);
    Log.e(TAG, "onActivityResult: " + requestCode);
    Log.e(TAG, "onActivityResult mCallbackContext: " + this + "  " + mCallbackContext);
    if (true)//requestCode == openwallet && mCallbackContext != null)
    {

     // if (resultCode == Activity.RESULT_OK)
      {

        Uri uri = data.getData();

        if (uri != null) {

          String path = data.toString();
          int urlindex = path.indexOf("url=");
          String url = path.substring(urlindex + 4);
          Log.w(TAG, "mCallbackContext.success  " + url.toString());
          //mCallbackContext.success(url);
          PluginResult dataResult = new PluginResult(PluginResult.Status.OK, url);
          dataResult.setKeepCallback(true);// 非常重要
          mCallbackContext.sendPluginResult(dataResult);
        } else {
          mCallbackContext.error("url was null");
        }

      }
//      else if (resultCode == Activity.RESULT_CANCELED) {
//        // TODO NO_RESULT or error callback?
//        PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT);
//        mCallbackContext.sendPluginResult(pluginResult);
//      } else
//        mCallbackContext.error(resultCode);
//      }
    }
  }
}

