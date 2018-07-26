package com.elastos.carrier;

import android.content.Context;
import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import io.ionic.starter.Logger;
import android.util.Log;

import com.elastos.desktop.AppActivity;

public class Util {
  private static String TAG = "Carrier-Agent";
  private Context mContext;

  public Util(){
    mContext = AppActivity.getContext();
  }


  public String getCarrierFilePath(){
    try {
      return  mContext.getFilesDir().getAbsolutePath() + "/elaCarrier";
//      Object sm = mContext.getSystemService(Context.STORAGE_SERVICE);
//      Method getVolumePathsMethod = Class.forName("android.os.storage.StorageManager").getMethod("getVolumePaths", new Class[0]);
//      String[] m_Paths = (String[]) getVolumePathsMethod.invoke(sm, new Object[]{});
//
//      if (m_Paths == null || m_Paths.length <= 0) {
//        m_Paths  = new String[]{"", ""};
//      }
//
//      return "file://" + m_Paths[0]+"/elastos/elaCarrier";
    } catch (Exception e) {
      error("getStoragePaths() failed" + e);
    }
    return "";
  }

  public String getConfigContent(String name) {
    String rootPath = mContext.getFilesDir().getParent();

    InputStream is = mContext.getClass().getClassLoader().getResourceAsStream("assets/carrier/" + name);
    try {
      String configString = IOUtils.toString(is, "UTF-8");
      return configString;
    } catch (Exception ex) {
      ex.printStackTrace();
      return "{}";
    }
  }

  public void log(String log){
    Log.d(TAG, log);
  }
  public void error(String log){
    Log.e(TAG, log);
  }

  public String hash256(String string) {
    MessageDigest md = null;
    String result = null;
    byte[] bt = string.getBytes();
    try {
      md = MessageDigest.getInstance("SHA-256");
      md.update(bt);
      result = bytes2Hex(md.digest()); // to HexString
    } catch (NoSuchAlgorithmException e) {
      return null;
    }
    return result;
  }

  public String bytes2Hex(byte[] bts) {
    String des = "";
    String tmp = null;
    for (int i = 0; i < bts.length; i++) {
      tmp = (Integer.toHexString(bts[i] & 0xFF));
      if (tmp.length() == 1) {
        des += "0";
      }
      des += tmp;
    }
    return des;
  }

  public JSONObject parseOneParam(String key, Object value) throws JSONException {
    JSONObject jsonObject = new JSONObject();
    jsonObject.put(key, value);
    return jsonObject;
  }
}
