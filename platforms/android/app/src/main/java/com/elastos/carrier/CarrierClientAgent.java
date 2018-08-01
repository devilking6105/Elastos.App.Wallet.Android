package com.elastos.carrier;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;
import android.content.Intent;

import com.elastos.desktop.AppActivity;


import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.io.File;


import org.apache.cordova.CallbackContext;
import org.elastos.carrier.*;
import org.elastos.carrier.Carrier;
import org.elastos.carrier.exceptions.ElastosException;
import org.elastos.carrier.session.Manager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@SuppressWarnings("unchecked")
public class CarrierClientAgent extends AbstractCarrierHandler {


  public static final String ACTION_SERVER_LIST_CHANGED  = "ACTION_SERVER_LIST_CHANGED";
  public static final String ACTION_SERVER_INFO_CHANGED  = "ACTION_SERVER_INFO_CHANGED";
  public static final String ACTION_AGENT_STATUS_CHANGED = "ACTION_AGENT_STATUS_CHANGED";

  public static CarrierClientAgent carrierClientAgentInstance;

  private String serverAddress;
  private String serverPassword;

  private Carrier mCarrier;
  private Manager mSessionManager;
  private ConnectionStatus mStatus;
  private boolean mReady;
  private CarrierClient client;

  private List<CarrierClient> mServerList;
  private Map<String, CarrierClient> mServerMap;

  private CallbackContext callbackContext;

  private Util util;

  public static int AGENT_READY = 0;

  public static CarrierClientAgent singleton() {
    if (carrierClientAgentInstance == null) {
      carrierClientAgentInstance = new CarrierClientAgent();
    }
    return carrierClientAgentInstance;
  }

  public CarrierClientAgent() {
    util = new Util();

    mServerList = new ArrayList<CarrierClient>();
    mServerMap = new HashMap();

    mStatus = ConnectionStatus.Disconnected;
    mReady  = false;
  }

  public void setCallback(CallbackContext cb){
    callbackContext = cb;
    util.log("set callback success");
  }

  public void callCallback(String key, Object value) {
    try{
      JSONObject param = util.parseOneParam(key, value);
      util.log("callback success => " + param);
      callbackContext.success(param);
    }catch(JSONException e){
      e.printStackTrace();
      callbackContext.error("json parse error");
    }

  }

  public void checkLogin() throws ElastosException {
    String elaCarrierPath = util.getCarrierFilePath();
    util.log(elaCarrierPath);
    File elaCarrierDir = new File(elaCarrierPath);
    if (!elaCarrierDir.exists()) {
      elaCarrierDir.mkdirs();
    }

    boolean udpEnabled = false;
    List<Carrier.Options.BootstrapNode> bootstraps = new ArrayList<>();

    try {
      JSONObject jsonObject = new JSONObject(util.getConfigContent("config.json"));

      udpEnabled = jsonObject.getBoolean("udp_enabled");

      JSONArray jsonBootstraps = jsonObject.getJSONArray("bootstraps");
      for (int i = 0, m = jsonBootstraps.length(); i < m; i++) {
        JSONObject jsonBootstrap = jsonBootstraps.getJSONObject(i);
        Carrier.Options.BootstrapNode bootstrap = new Carrier.Options.BootstrapNode();
        String ipv4 = jsonBootstrap.optString("ipv4");
        if (ipv4 != null) {
          bootstrap.setIpv4(ipv4);
        }
        String ipv6 = jsonBootstrap.optString("ipv6");
        if (ipv4 != null) {
          bootstrap.setIpv6(ipv6);
        }
        bootstrap.setPort(jsonBootstrap.getString("port"));
        bootstrap.setPublicKey(jsonBootstrap.getString("public_key"));
        bootstraps.add(bootstrap);
      }
    } catch (Exception e) {
      // report exception
      util.error(e.toString());
    }

    if (elaCarrierDir.exists()) {
      File[] files = elaCarrierDir.listFiles();
      for (File file : files) {
        util.log(file.toString());
      }
    }

    Carrier.Options options = new Carrier.Options();
    options.setPersistentLocation(elaCarrierPath).
      setUdpEnabled(udpEnabled).
      setBootstrapNodes(bootstraps);

    Carrier.initializeInstance(options, this);
    mCarrier = Carrier.getInstance();
    util.log("Agent elastos carrier instance created successfully");

    String address = mCarrier.getAddress();
    util.log(String.format("Address => %s", address));
    util.log(String.format("UserID => %s", mCarrier.getUserId()));

    mSessionManager = Manager.getInstance(mCarrier);
    util.log("Agent session manager created successfully");
  }

  public boolean isReady() {
    return mReady;
  }


  public void start(String address, String pwd) {
    serverAddress = address;
    serverPassword = pwd;
    try {
      if (mCarrier == null) {
        checkLogin();
      }

      mCarrier.start(50);
    } catch (ElastosException e) {
      util.log(String.format("checkLogin error (0x%x)", e.getErrorCode()));
    }
  }

  public void logout() {
    String elaCarrierPath = util.getCarrierFilePath();
    File elaCarrierDir = new File(elaCarrierPath);
    if (elaCarrierDir.exists()) {
      File[] files = elaCarrierDir.listFiles();
      for (File file : files) {
//        file.delete();
      }
    }

    this.kill();


  }

  public void kill() {
//    try{
//      for(CarrierClient server: mServerList){
//        server.close();
//      }
//    }catch(Exception e){
//      util.error(e.toString());
//    }

    mServerList.clear();
    mServerMap.clear();

    if (mCarrier != null) {
      mSessionManager.cleanup();
      mCarrier.kill();
    }

    carrierClientAgentInstance = null;
    util.log("Carrier node was killed");
  }

  public List<CarrierClient> getServerList() {
    return mServerList;
  }

  public CarrierClient getServer(String serverId) {
    return mServerMap.get(serverId);
  }

  public void pairServer(String serverAddress, String password) throws ElastosException {
    try{
      if(!mCarrier.isFriend(serverAddress)){
        util.log("start to connect address => " + serverAddress + " with msg "+ password);

        String hello = util.hash256(password);
        mCarrier.addFriend(serverAddress, hello);

        util.log("Friend request to portforwarding server " + serverAddress + " success");
      }
    }catch(Exception e){
      util.error(e.toString());
    }

  }

  public UserInfo getInfo() throws ElastosException {
    return mCarrier.getSelfInfo();
  }

  public Manager getSessionManager() {
    return mSessionManager;
  }

  @Override
  public void onConnection(Carrier carrier, ConnectionStatus status) {
    util.log("Agent connection status changed to " + status);

    mStatus = status;

    if (mReady && status == ConnectionStatus.Connected){
      try{
        pairServer(serverAddress, serverPassword);
      }catch(ElastosException e){
        util.log(String.format("checkLogin error (0x%x)", e.getErrorCode()));
      }

    }

  }

  @Override
  public void onReady(Carrier carrier) {
    try {
      UserInfo info;
      info = carrier.getSelfInfo();

      if (info.getName().isEmpty()) {
        String manufacturer = Build.MANUFACTURER;
        String name = Build.MODEL;

        if (!name.startsWith(manufacturer))
          name = manufacturer + " " + name;
        if (name.length() > UserInfo.MAX_USER_NAME_LEN)
          name = name.substring(0, UserInfo.MAX_USER_NAME_LEN);

        info.setName(name);

        carrier.setSelfInfo(info);
        util.log(info.toString());
      }
    } catch (ElastosException e) {
      util.error(String.format("Update current user name error (0x%x)", e.getErrorCode()));
      e.printStackTrace();

      return;
    }

    util.log("Elastos carrier instance is ready.");
    mReady = true;
  }

  @Override
  public void onFriends(Carrier carrier, List<FriendInfo> friends) {
    util.log("Client portforwarding agent received friend list: " + friends);


    for(FriendInfo info: friends){
      String serverId = info.getUserId();
      CarrierClient server = mServerMap.get(serverId);

      if(server == null){
        server = new CarrierClient();
        mServerList.add(server);
        mServerMap.put(serverId, server);
      }

      server.setInfo(info);
      server.setConnectionStatus(info.getConnectionStatus());
    }

  }

  @Override
  public void onFriendInfoChanged(Carrier carrier, String friendId, FriendInfo friendInfo) {
    CarrierClient server = mServerMap.get(friendId);
    assert(server != null);

    util.log("Server " + friendId + "info changed to " + friendInfo);

    server.setInfo(friendInfo);
  }

  @Override
  public void onFriendConnection(Carrier carrier, String friendId, ConnectionStatus status) {
    CarrierClient server = mServerMap.get(friendId);
    assert(server != null);
    util.log("Server " + friendId + " connection status changed to " + status);

    server.setConnectionStatus(status);

    if(server.isOnline()){
      server.setupPortforwarding();
    }
    else{
      server.close();
    }
  }

  @Override
  public void onFriendPresence(Carrier carrier, String friendId, PresenceStatus presence) {
    CarrierClient server = mServerMap.get(friendId);
    assert(server != null);
    util.log("Server" + friendId + "presence changed to " + presence);

    if(server.isOnline()){
      server.setupPortforwarding();
    }
    else{
      server.close();
    }

  }

  @Override
  public void onFriendAdded(Carrier carrier, FriendInfo friendInfo) {
    client = new CarrierClient();
    client.setInfo(friendInfo);
    client.setConnectionStatus(friendInfo.getConnectionStatus());

    mServerList.add(client);
    mServerMap.put(client.getServerId(), client);

    util.log("Server " + client.getServerId() + " added: " + friendInfo);
  }

  @Override
  public void onFriendRemoved(Carrier carrier, String friendId) {
    CarrierClient server = mServerMap.remove(friendId);
    assert(server != null);

    mServerList.remove(server);
    util.log("Portforwarding server " + friendId + "removed");


  }

}
