package com.elastos.carrier;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;


import java.net.ServerSocket;

import org.elastos.carrier.ConnectionStatus;
import org.elastos.carrier.FriendInfo;
import org.elastos.carrier.PresenceStatus;
import org.elastos.carrier.session.*;
import org.elastos.carrier.exceptions.ElastosException;
import org.json.JSONException;

public class CarrierClient extends AbstractStreamHandler implements SessionRequestCompleteHandler {
  public static String ACTION_SERVER_STATUS_CHANGED = "ACTION_SERVER_STATUS_CHANGED";
  private FriendInfo mFriendInfo;
  private Session mSession;
  private String  mPort;
  private int mPfId;
  private Stream mStream;
  private StreamState mState = StreamState.Closed;

  private boolean mNeedClosePortforwarding = false;

  public static final int STATUS_READY   = 0;
  public static final int STATUS_INPROGRESS = 1;
  public static final int STATUS_OFFLINE = 2;
  public static final int STATUS_SESSION_REFUSED = 3;

  public String getHost() { return "127.0.0.1"; }

  public String getPort() {
    return mPort;
  }

  public String getName() {
    return mFriendInfo.getName();
  }

  public String getServerId() {
    return mFriendInfo.getUserId();
  }

  private Util util = new Util();

  public void setPort(String port) {
    if (mPort != port) {
      mPort = port;

      if (mState == StreamState.Connected) {
        try {
          mNeedClosePortforwarding = true;
          openPortforwarding();

        } catch (ElastosException e) {
          e.printStackTrace();

          util.log("Portforwarding to " + getServerId() + " opened error.");
        }
        return;
      }
    }
  }

  public void setInfo(FriendInfo friendInfo) {
    mFriendInfo = friendInfo;
  }
  public void setConnectionStatus(ConnectionStatus connectionStatus) {
    mFriendInfo.setConnectionStatus(connectionStatus);
  }

  public boolean isOnline() {
    return mFriendInfo.getConnectionStatus() == ConnectionStatus.Connected &&
      mFriendInfo.getPresence() == PresenceStatus.None;
  }

  @Override
  public void onCompletion(Session session, int status, String reason, String sdp) {
    if (status != 0) {
      util.log(String.format("Session request completion with error (%d:%s", status, reason));
      close();
      return;
    }

    try {
      session.start(sdp);
      util.log("Session started success.");
    } catch (ElastosException e) {
      util.error("Session start error " + e.getErrorCode());
    }
  }

  public void setupPortforwarding() {
    util.log("method call => setupPortforwarding");
    if (!isOnline()) {

      return;
    }

    if (mState == StreamState.Initialized || mState == StreamState.TransportReady
      || mState == StreamState.Connecting) {
      return;
    }
    else if (mState == StreamState.Connected) {
      try {
        openPortforwarding();
      } catch (ElastosException e) {
        e.printStackTrace();

        util.error(String.format("Portforwarding to " + getServerId() + " opened error. -- (0x%x)", e.getErrorCode()));
      }
      return;
    }
    else {
      mState = StreamState.Closed;

      int sopt = Stream.PROPERTY_MULTIPLEXING
        | Stream.PROPERTY_PORT_FORWARDING
        | Stream.PROPERTY_RELIABLE;

      try {
        mSession = CarrierClientAgent.singleton().getSessionManager()
          .newSession(mFriendInfo.getUserId());
        mSession.addStream(StreamType.Application, sopt, this);
      }
      catch (ElastosException e) {
        e.printStackTrace();

        if (mSession == null) {
          util.error(String.format("New session to %s error (0x%x)",
            getServerId(), e.getErrorCode()));
        }
        else {
          util.error(String.format("Add stream error (0x%x)", e.getErrorCode()));
          mSession.close();
          mSession = null;
        }
      }
    }
  }

  private void openPortforwarding() throws ElastosException {
    util.log("method call => openPortforwarding");
    if (mPfId > 0 && !mNeedClosePortforwarding) {
      util.log("Portforwarding to " + getName() + " already opened.");
    }
    else {
      if (mPfId > 0) {
        mStream.closePortForwarding(mPfId);
        mPfId = -1;
        mNeedClosePortforwarding = false;
      }

      String port = mPort;
      if (port == null || port.isEmpty()) {
        port = String.valueOf(findFreePort());
      }

      mPfId = mStream.openPortForwarding("owncloud", PortForwardingProtocol.TCP, getHost(), port);

      mPort = port;

      util.log("Portforwarding to " + getServerId() + " opened with port "+ port);

      String param = getHost()+":"+port;
      CarrierClientAgent.singleton().callCallback("connected", param);
    }
  }

  @Override
  public void onStateChanged(Stream stream, StreamState state) {
    util.log("onStateChanged : " + stream.getStreamId() + "  :  " + state);
    mState = state;
    try {
      switch (state) {
        case Initialized:
          mSession.request(this);
          util.log("Session request to " + getServerId() + " sent.");
          break;

        case TransportReady:
          util.log("Stream to " + getServerId() + " transport ready");
          break;

        case Connected:
          util.log("Stream to " + getServerId() + " connected.");
          mStream = stream;
          openPortforwarding();
          break;

        case Deactivated:
          util.log("Stream deactived");
          close();
          break;
        case Closed:
          util.log("Stream closed");
          close();
          break;
        case Error:
          util.log("Stream error");
          close();
          CarrierClientAgent.singleton().restart();
          break;
      }
    } catch (ElastosException e) {
      util.error(String.format("Stream error (0x%x)", e.getErrorCode()));
      close();
    }
  }

  private int findFreePort() {
    int port;

    try {
      ServerSocket socket = new ServerSocket(0);
      port = socket.getLocalPort();
      socket.close();

    } catch(Exception e) {
      port = -1;
    }

    return port;
  }

  public void close() {
    util.log("method call => close");
    if (mSession != null) {
      mSession.close();
      mSession = null;
      mStream = null;
      mState  = StreamState.Closed;
      mPfId = -1;
    }
  }
}
