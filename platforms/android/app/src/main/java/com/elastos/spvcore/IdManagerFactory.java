
package com.elastos.spvcore;


import android.util.Log;

public class IdManagerFactory {
    public static IDidManager CreateIdManager(IMasterWallet masterWallet, String rootPath) {
        long didManagerProxy = nativeCreateIdManager(masterWallet.GetProxy(), rootPath);
        Log.d("IdManagerFactory","didManagerProxy=" + didManagerProxy);
        return new IDidManager(didManagerProxy);
    }

    private static native long nativeCreateIdManager(long masterWalletProxy, String rootPath);
}
