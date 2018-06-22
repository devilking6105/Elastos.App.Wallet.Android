package com.plugin.testPlugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.net.Uri;


/**
 * This class echoes a string called from JavaScript.
 */
public class TestPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
          cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
              Intent mIntent = new Intent();
              mIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
              mIntent.setData(Uri.parse("elastos://elastos?action=27&url=file:///android_asset/samples/www/index.html"));
              mIntent.setPackage("io.ionic.starter");
              cordova.getActivity().startActivity(mIntent);
            }
          });
			        callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
