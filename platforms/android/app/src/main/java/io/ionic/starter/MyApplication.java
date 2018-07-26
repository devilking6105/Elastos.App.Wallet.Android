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

import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.text.TextUtils;
import android.util.Log;



/**
 * For developer startup JPush SDK
 * <p>
 * 一般建议在自定义 Application 类里初始化。也可以在主 Activity 里。
 */
public class MyApplication extends Application {
  private static final String TAG = "MyApplication";

  @Override
  public void onCreate() {
    Log.d(TAG, "[MyApplication] onCreate");
    super.onCreate();
    int appversionCode = 1;
    int oldappversionCode = 0;
    PackageManager manager = this.getPackageManager();
    try {
      PackageInfo info = manager.getPackageInfo(this.getPackageName(), 0);
      appversionCode = info.versionCode; //版本号
    } catch (PackageManager.NameNotFoundException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    SharedPreferences mPerferences = PreferenceManager
      .getDefaultSharedPreferences(this);

    oldappversionCode = mPerferences.getInt("versionCode", 0);

    Log.d(TAG, "[MyApplication] appversionCode："+ appversionCode + "  " + oldappversionCode);
    if (appversionCode > oldappversionCode) {
      SharedPreferences.Editor mEditor = mPerferences.edit();

      mEditor.putInt("versionCode", appversionCode);
      mEditor.commit();

      String sdpath = getStoragePaths();
      if (sdpath != null || sdpath.length() > 0) {
          try {
            unZip(this, "assets.zip", getStoragePaths() + "/elastos/", false);
          } catch (IOException e) {
            e.printStackTrace();
          }
      }
    }

//         JPushInterface.setDebugMode(true); 	// 设置开启日志,发布时请关闭日志
//         JPushInterface.init(this);     		// 初始化 JPush
  }


  private String getStoragePaths() {
    try {
      Object sm = this.getSystemService("storage");
      Method getVolumePathsMethod = Class.forName("android.os.storage.StorageManager").getMethod("getVolumePaths", new Class[0]);
      String[] m_Paths = (String[]) getVolumePathsMethod.invoke(sm, new Object[]{});
      Log.d(TAG, "length: " + m_Paths.length);
      if (m_Paths == null || m_Paths.length <= 0) {
        m_Paths = new String[]{"", ""};
      }
      Log.d(TAG, "Path0: " + m_Paths[0]);
      return m_Paths[0];
    } catch (Exception e) {
      Log.d(TAG, "getStoragePaths() failed" + e);
    }
    return "";
  }

  public static void deleteFolderFile(String filePath, boolean deleteThisPath) {
    if (!TextUtils.isEmpty(filePath)) {
      try {
        File file = new File(filePath);
        if (file.isDirectory()) { //目录
          File files[] = file.listFiles();
          for (int i = 0; i < files.length; i++) {
            deleteFolderFile(files[i].getAbsolutePath(), true);
          }
        }
        if (deleteThisPath) {
          if (!file.isDirectory()) { //如果是文件，删除
            file.delete();
          } else { //目录
            if (file.listFiles().length == 0) { //目录下没有文件或者目录，删除
              file.delete();
            }
          }
        }
      } catch (Exception e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
    }
  }

  public static void unZip(Context context, String assetName, String outputDirectory, boolean isReWrite) throws IOException {
    Log.e(TAG, "outputDirectory: " + outputDirectory);
    File file = new File(outputDirectory);

    if(file.exists() &&file.isDirectory()) {
      deleteFolderFile(outputDirectory, true);
    }

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
