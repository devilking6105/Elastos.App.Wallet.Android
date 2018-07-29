/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.elastos.desktop;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.CordovaActivity;

import java.lang.reflect.Method;


import io.ionic.starter.Logger;
import io.ionic.starter.MyUtil;

import com.elastos.carrier.Carrier;


public class AppActivity extends CordovaActivity {
  private Carrier carrier;

  public String TAG = "Elastos-DApp";

  private static Context mContext;

  static {
    System.loadLibrary("spvsdk");
    System.loadLibrary("idchain");
    System.loadLibrary("elastoswallet");

//    System.loadLibrary("elacarrier");
//    System.loadLibrary("elacommon");
//    System.loadLibrary("elasession");
  }
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        mContext = getApplicationContext();
//        carrier = new Carrier();

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        //loadUrl(launchUrl);
        Log.e(TAG, launchUrl);

      String scheme = "";
      String host = "";
      String startParams= "";
      Intent intent = getIntent();
      Log.e(TAG, "intent: " + intent);
      if (null != intent) {
        Uri data = intent.getData();
        Log.e(TAG, "data: " + data);
        if (null != data) {
          scheme = data.getScheme();
          host = data.getHost();
          if (scheme.equals("elastos") && host.equals("elastos")) {

            String path = data.toString();
            int urlindex = path.indexOf("url=");
            String url = path.substring(urlindex + 4);
            Log.e(TAG, "url: " + url);
//            String sdcardurl = url.replace("android_asset", getStoragePaths()+"/elastos");
            String sdcardurl = url;
            if(!url.startsWith("file://")) {
              sdcardurl = "file:///" + getStoragePaths() + "/elastos/" + url;
            }
            Log.e(TAG, "loadUrl: " + sdcardurl);
//            loadUrl(sdcardurl);

            String sdurl = "file://" + getStoragePaths()+"/abc/www/index.html";
            loadUrl(sdurl);
          } else {
            startParams = data.getQuery();
          }
        } else {
          Log.e(TAG,"data is null");
          String param = intent.getStringExtra("param");

          loadUrl("file:///android_asset/samples/www/index.html");
        }
      } else {
        loadUrl("file:///android_asset/samples/www/index.html");
      }

      initJG();
    }


  private String  getStoragePaths() {
    try {
      Object sm = this.getSystemService(Context.STORAGE_SERVICE);
      Method getVolumePathsMethod = Class.forName("android.os.storage.StorageManager").getMethod("getVolumePaths", new Class[0]);
      String[] m_Paths = (String[]) getVolumePathsMethod.invoke(sm, new Object[]{});
      Logger.d(TAG,"length: " + m_Paths.length);
      if (m_Paths == null || m_Paths.length <= 0) {
        m_Paths  = new String[]{"", ""};
      }
      Logger.d(TAG,"Path0: " + m_Paths[0]);
      return  m_Paths[0];
    } catch (Exception e) {
      Logger.d(TAG,"getStoragePaths() failed" + e);
    }
    return "";
  }

  private void initJG(){
//    MyUtil.moveConfigFiles2RootPath(this);

    Context applicationContext = getApplicationContext();
    MyUtil.setApplicationContext(applicationContext);

  }

  @Override
  public void onBackPressed() {
    super.onBackPressed();

    Carrier.close();
    finish();
    super.onDestroy();
    System.exit(0);
//
    Log.e(TAG, "按下了back键   onBackPressed()");
  }



  public static Context getContext(){
    return mContext;
  }


}
