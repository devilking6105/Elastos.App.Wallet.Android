package io.ionic.starter;

import android.app.Application;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.LinkedList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import android.content.Context;
import android.content.Intent;

import android.app.Activity;
import android.os.Environment;
import android.util.Log;

import cn.jpush.android.api.JPushInterface;

/**
 * For developer startup JPush SDK
 *
 * 一般建议在自定义 Application 类里初始化。也可以在主 Activity 里。
 */
public class MyApplication extends Application {
    private static final String TAG = "JIGUANG";

    @Override
    public void onCreate() {
    	 Logger.d(TAG, "[MyApplication] onCreate");
       super.onCreate();
        File file = new File(getStoragePaths() + "/elastos/");
        if (!file.exists()) {
          try {
            unZip(this, "assets.zip", getStoragePaths() + "/elastos/", false);
          } catch (IOException e) {
            e.printStackTrace();
          }
        }

//         JPushInterface.setDebugMode(true); 	// 设置开启日志,发布时请关闭日志
//         JPushInterface.init(this);     		// 初始化 JPush
    }


  private String  getStoragePaths() {
    try {
      Object sm = this.getSystemService("storage");
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

  public static void unZip(Context context, String assetName, String outputDirectory, boolean isReWrite) throws IOException {
    Log.e(TAG, "outputDirectory: " + outputDirectory);
    File file = new File(outputDirectory);
    if (!file.exists()) {
      file.mkdirs();
    }
    InputStream inputStream = context.getAssets().open(assetName);
    ZipInputStream zipInputStream = new ZipInputStream(inputStream);
    ZipEntry zipEntry = zipInputStream.getNextEntry();
    byte[] buffer = new byte[1024 * 1024];
    int count = 0;
    while (zipEntry != null) {
      if (zipEntry.isDirectory()) {
        file = new File(outputDirectory + File.separator + zipEntry.getName());
        if (isReWrite || !file.exists()) {
          file.mkdir();
        }
      } else {
        file = new File(outputDirectory + File.separator + zipEntry.getName());
        if (isReWrite || !file.exists()) {
          file.createNewFile();
          FileOutputStream fileOutputStream = new FileOutputStream(file);
          while ((count = zipInputStream.read(buffer)) > 0) {
            fileOutputStream.write(buffer, 0, count);
          }
          fileOutputStream.close();
        }
      }
      zipEntry = zipInputStream.getNextEntry();
    }
    zipInputStream.close();
  }
}
