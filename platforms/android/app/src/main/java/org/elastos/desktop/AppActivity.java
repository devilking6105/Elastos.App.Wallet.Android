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

package org.elastos.desktop;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.LOG;

import java.lang.reflect.Method;

import io.ionic.starter.Logger;


public class AppActivity extends CordovaActivity
{

  public String TAG = "Elastos.AppActivity";

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        //loadUrl(launchUrl);
        String scheme = "";
        String host = "";
        String startParams= "";
        Intent intent = getIntent();
        if (null != intent) {
          Uri data = intent.getData();
          if (null != data) {
            scheme = data.getScheme();
            host = data.getHost();
            if (scheme.equals("elastos") && host.equals("elastos")) {
              String path = data.toString();
              int urlindex = path.indexOf("url=");
              String url = path.substring(urlindex + 4);
              String sdcardurl = url;
              if(!url.startsWith("file://")) {
                sdcardurl = "file:///" + getStoragePaths() + "/elastos/" + url;
              }

            Log.e(TAG, "loadUrl: " + sdcardurl);
            loadUrl(sdcardurl);
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

    }

  private String  getStoragePaths() {
    try {
      Object sm = this.getSystemService("storage");
      Method getVolumePathsMethod = Class.forName("android.os.storage.StorageManager").getMethod("getVolumePaths", new Class[0]);
      String[] m_Paths = (String[]) getVolumePathsMethod.invoke(sm, new Object[]{});
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
  private long exitTime = 0;

  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
    Log.d(TAG, "onKeyDown() " + keyCode);
    if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_DOWN) {
      if ((System.currentTimeMillis() - exitTime) > 2000) {
        Toast.makeText(getApplicationContext(), "再按一次退出程序", Toast.LENGTH_SHORT).show();
        exitTime = System.currentTimeMillis();
      } else {
        finish();
        System.exit(0);
      }
      return true;
    }
    return super.onKeyDown(keyCode, event);
  }
  @Override
  public void onDestroy() {
    LOG.d(TAG, "CordovaActivity.onDestroy()");
    super.onDestroy();

    //finish();
    //System.exit(0);
  }
}
