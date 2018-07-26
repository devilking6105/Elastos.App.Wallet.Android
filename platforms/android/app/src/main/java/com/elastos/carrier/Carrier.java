package com.elastos.carrier;

public class Carrier {

  public void init(){
    nativeOnReady();
  }

  public void InitSession(){
    nativeInitSession();
  }

  private native void nativeInitSession();

  private native void nativeOnReady();
}
