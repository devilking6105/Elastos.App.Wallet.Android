package org.apache.cordova.engine;

import android.content.Context;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ValueCallback;
import android.widget.FrameLayout;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewEngine;
import org.chromium.base.annotations.CalledByNative;
import org.chromium.base.annotations.JNINamespace;
import org.chromium.base.library_loader.LibraryProcessType;
import org.chromium.base.library_loader.ProcessInitException;
import org.chromium.components.content_view.ContentView;
import org.chromium.content.browser.BrowserStartupController;
import org.chromium.content.browser.ContentViewCoreImpl;
import org.chromium.content.browser.ContentViewRenderView;
import org.chromium.content_public.browser.ContentViewCore;
import org.chromium.content_public.browser.JavaScriptCallback;
import org.chromium.content_public.browser.JavascriptInjector;
import org.chromium.content_public.browser.LoadUrlParams;
import org.chromium.content_public.browser.NavigationController;
import org.chromium.content_public.browser.WebContents;
import org.chromium.ui.base.ActivityWindowAndroid;
import org.chromium.ui.base.ViewAndroidDelegate;

@JNINamespace("content")
class ShellWebView extends FrameLayout implements CordovaWebViewEngine.EngineView {
    private static final String TAG = "ShellWebView";

    private static final int WARN = 1;

    private static final boolean useAsync = false;

    private ContentViewCoreImpl mContentViewCore;
    private WebContents mWebContents;
    private NavigationController mNavigationController;
    private ActivityWindowAndroid mWindowAndroid;
    private ContentViewRenderView mContentViewRenderView;
    private ContentView mContentView;
    private ViewAndroidDelegate mViewAndroidDelegate;
    private ShellWebViewEngine parentEngine;

    //private FrameLayout mContentViewHolder;
    private long mNativeShellWebView;

    private boolean finishInitialized = false;

    private String pendingUrl;

    private JavascriptInjector mJavascriptInjector;

    private CordovaContentsClientBridge mBridge;

    public View getContainerView(){
        return this;
    }

    public ViewGroup getContentView() {
        ViewAndroidDelegate viewDelegate = mWebContents.getViewAndroidDelegate();
        return viewDelegate != null ? viewDelegate.getContainerView() : null;
    }

    public ShellWebView(Context context) {
        super(context, null);
    }

    public void init(ShellWebViewEngine parentEngine){
        setupClient(parentEngine);
        mNativeShellWebView = nativeInit();
        nativeSetJavaPeer(mNativeShellWebView, this, mBridge);
        initView();
    }

    @Override
    public CordovaWebView getCordovaWebView() {
        return null;
    }

    private void setupClient(ShellWebViewEngine parentEngine){
        mBridge = new CordovaContentsClientBridge(getContext(), new ShellWebViewClient(parentEngine));
        this.parentEngine = parentEngine;
    }

    private JavascriptInjector getJavascriptInjector() {
        if (mJavascriptInjector == null) {
            mJavascriptInjector = JavascriptInjector.fromWebContents(mWebContents);
        }
        return mJavascriptInjector;
    }

    public void initView() {
        Log.e(TAG, "init");
        final boolean listenToActivityState = false;
        mWindowAndroid = new ActivityWindowAndroid(getContext(), listenToActivityState);
        mContentViewRenderView = new ContentViewRenderView(getContext());
        mContentViewRenderView.onNativeLibraryLoaded(mWindowAndroid);
        mWindowAndroid.setAnimationPlaceholderView(
                mContentViewRenderView.getSurfaceView());
        startup();
    }

    private void finishInitialization()
    {
        Log.e(TAG, "finishInitialization");
       nativeCreateWebContent(mNativeShellWebView);

       if(pendingUrl!=null && pendingUrl.length()> 0){
        loadUrl(pendingUrl);
       }
    }

    private void initializationFailed()
    {
        Log.e(TAG, "initializationFailed");
    }

    private void startup(){
        Log.e(TAG, "startup");
        if (!useAsync){
            try{
                BrowserStartupController.get(LibraryProcessType.PROCESS_BROWSER)
                        .startBrowserProcessesSync(true);
                finishInitialization();
                return;
            } catch (ProcessInitException e) {
                Log.e(TAG, "Unable to load native library.", e);
                System.exit(-1);
            }
        }

        try {
            BrowserStartupController.get(LibraryProcessType.PROCESS_BROWSER)
                    .startBrowserProcessesAsync(
                            true,
                            new BrowserStartupController.StartupCallback() {
                                @Override
                                public void onSuccess(boolean alreadyStarted) {
                                    finishInitialization();
                                }

                                @Override
                                public void onFailure() {
                                    initializationFailed();
                                }
                            });
        } catch (ProcessInitException e) {
            Log.e(TAG, "Unable to load native library.", e);
            System.exit(-1);
        }
    }

    public static String sanitizeUrl(String url) {
        if (url == null) return null;
        if (url.startsWith("www.") || url.indexOf(":") == -1) url = "http://" + url;
        return url;
    }

    public void loadUrl(final String url){
        if (url == null) return;
        if (!finishInitialized){
            pendingUrl = url;
            return;
        }
        Log.e(TAG, "loadUrl:" + url);
        mNavigationController.loadUrl(new LoadUrlParams(sanitizeUrl(url)));
        getContentView().clearFocus();
        getContentView().requestFocus();
    }


    @CalledByNative
    private void initContentViewCore(WebContents webContents) {
        Log.e(TAG, "initContentViewCore from native:" + webContents);
        finishInitialized = true;
        Context context = getContext();
        mContentView = ContentView.createContentView(context, webContents);
        mViewAndroidDelegate = ViewAndroidDelegate.createBasicDelegate(mContentView);
        mContentViewCore = (ContentViewCoreImpl) ContentViewCore.create(
                context, "", webContents, mViewAndroidDelegate, mContentView, mWindowAndroid);
        mWebContents = webContents;
        mNavigationController = mWebContents.getNavigationController();
        if (getParent() != null) mWebContents.onShow();
        addView(mContentViewRenderView,
                    new FrameLayout.LayoutParams(
                            FrameLayout.LayoutParams.MATCH_PARENT,
                            FrameLayout.LayoutParams.MATCH_PARENT));

        addView(mContentView,
                new FrameLayout.LayoutParams(
                        FrameLayout.LayoutParams.MATCH_PARENT,
                        FrameLayout.LayoutParams.MATCH_PARENT));
        mContentView.requestFocus();
        mContentViewRenderView.setCurrentWebContents(mWebContents);
    }

    public String getUrl(){
        if (isDestroyed(WARN)) return null;
        String url =  mWebContents.getVisibleUrl();
        if (url == null || url.trim().isEmpty()) return null;
        return url;
    }

    public void stopLoading() {
        if (!isDestroyed(WARN)) mWebContents.stop();
    }

    public void clearCache() {
        //if (!isDestroyed(WARN)) nativeClearCache(true);
    }

    public void clearHistory() {
        if (!isDestroyed(WARN)) mNavigationController.clearHistory();
    }

    public boolean canGoBack() {
        Log.e(TAG,"canGoBack" + mNavigationController.canGoBack());
        return isDestroyed(WARN) ? false : mNavigationController.canGoBack();
    }

    public boolean goBack() {
        if (!isDestroyed(WARN)) mNavigationController.goBack();
        return true;
    }

    public void evaluateJavascript(String js, final ValueCallback<String> callback){
        JavaScriptCallback jsCallback = null;
        if (callback != null) {
            jsCallback = new JavaScriptCallback() {
                @Override
                public void handleJavaScriptResult(String jsonResult) {
                    callback.onReceiveValue(jsonResult);
                }
            };
        }

        mWebContents.evaluateJavaScript(js, jsCallback);
    }

    private boolean isDestroyed(int warnIfDestroyed) {
        return false;
    }

    public void addJavascriptInterface(final Object obj, final String interfaceName){
        if (finishInitialized){
            getJavascriptInjector().addPossiblyUnsafeInterface(obj, interfaceName, null);
        }else{

        }
    }

    public void destroy(){
        mContentViewRenderView.destroy();
        mContentViewRenderView = null;
        mContentViewCore.destroy();
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        Log.e(TAG, "dispatchKeyEvent event=" + event);
        Boolean ret = parentEngine.client.onDispatchKeyEvent(event);
        if (ret != null) {
            return ret.booleanValue();
        }
        return super.dispatchKeyEvent(event);
    }

    private static native long nativeInit();
    private native void nativeSetJavaPeer(long nativeShellWebView, ShellWebView sw, CordovaContentsClientBridge bridge);
    private native void nativeCreateWebContent(long nativeShellWebView);
}
