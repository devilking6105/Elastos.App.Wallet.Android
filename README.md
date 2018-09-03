## Elastos Desktop App

#####################set up application development environment##############################
1 replace package named "android.jar" under the path "build"directory to the file of same name under the path"AndroidSDK\platforms\android-26", and make sure you backup the former file.
2. use Android Studio to open the engineering file under the path "Elastos.ORG.Wallet.Mobile\platforms\android", and make project, run it on the mobile side.

there is a "TODO" and a "CAR" demo attaching in the installation package. 

developers use Ionic environment to finish the engineering file, if there is no cordova plugin of special dependent java version, you can compress the folder under the path"platforms\android\app\src\main\assets\www" to a epk package, and run it on the Elastos Trinity.

directory explanation of Epk package --todo


####################set up plug development environment ####################################
###  install related lib

##### install ionic|cordova
> npm install -g ionic cordova 
##### install dependent pacakge
> npm install


### run

#### 1、run web side ：
>ionic serve 
#### 2、run android side：
>ionic cordova run android --device
#### 3、android side-debug mode:
> ionic cordova run android -l -c -s // mount local page、realtime update, need choose local IP 
#### 4、android studio load project initiation：
> webview is loaded from "assets" directory once website is compiled, if Android Studio directly start the android porject, advise repeating 1 or 3 to pack.
---

### project structure

- src |web code
    - app/app-routing.module.ts |web routing
    - pages |web page
    - providers/WalletManager.ts | cordova plug calling  
- www |web code after packing
- platforms |
    - android | android project
        - assets | web project after packing
        - jniLibs | store "so" dynamic lib
        - com.elastos.spvcore.WalletManager | java->c++ jni calling
        - ElaWallet.Wallet | java-js jni calling
        - io.ionic.starter.MainActivity |  mount the program input of webview
- plungin-src |wallet plug code, add to main directory by command
    - plugin.xml |configuring file
    - www |  js code, call JS code
    - src |  java code interface of Java plug
- plugins |cordova interface
    - ElaWallet | wallet plug 
       
        - automaticall pack to the project, there is similarity between anroid and platforms
### c++ layer
> reference https://github.com/elastos/Elastos.ELA.SPV.Cpp/tree/jni


### base command
* delete wallet plug : `ionic cordova plugin remove ElaWallet`
* add wallet plug: `cd plungin-src && ionic cordova plugin add  ElaWallet`
* pack wallet plug : `cd .. && ionic cordova build android`
* `ionic cordova plugin remove ElaWallet && cd plungin-src && ionic cordova plugin add  ElaWallet && cd ..  && ionic cordova run android --device --prod`

### NDK version
* android-ndk-r16b

### offical packing command
ionic cordova build android --release --prod



####################Elatos WebRT 说明####################################
# elastos_web_rt description
## download the code

```
$git clone https://github.com/elastos/Elastos.Trinity.android trinty
```

## parameter configuration

```
$gn args out/arm
```

follow parameter configuration 

```
target_os="android"
target_cpu = "arm"
is_debug=false
symbol_level=1
is_official_build=true
is_chrome_branded=false
use_official_google_api_keys=false
enable_resource_whitelist_generation=false
ffmpeg_branding="Chrome"
proprietary_codecs=true
enable_remoting=true
```

## compile

```
$ninja -C out/arm elastos_webrt_apk
```

we need two files produced：
Elastos.Trinity.android/src/out/arm/apks/ElastosWebRT.apk and Elastos.Trinity.android/src/out/arm/lib.java/elastos_webrt_java.jar

##  process targetting file:
we need provide Jar package and so to studio environment, part of code from chromium building is automatically filled after producing apk, we have to replace the sparated Jar package manually , with following steps:

    a. manually replace the class file under the path "elastos_webrt_java.jar中nativelibrary，buildconfig"
    use "/org/chromium/base/" in the directory" Elastos.Trinity.android/src/out/arm/gen/content/cordova/android/elastos_webrt_apk/elastos_webrt_apk.jar"  to  replace "/org/chromium/base/" in the directory"Elastos.Trinity.android/src/out/arm/lib.java/elastos_webrt_java.jar"
    
    b. delete some conflicted package(com.android.support)between "elastos_webrt_java.jar and AndroidStudio，following directory：elastos_webrt_java.jar/android/support/v4

## ElastosWebRT output includes following major files：
    elastos_webrt_java.jar(jar package produced by chromium java layer )
    cordovaLib (library code of cordava )
    asset(dat，bin，pak is resource files related with chromium)
    Build.gradle(diff)
    manifest.xml(diff)
    android.jar
usage is a little complicated, we do not need these complicated operation if we develop on the Elastos.ORG.Wallet. We just need clone, and replace the package named"android.jar"under sdk. And only web engine developer need to operate it. 

# Studio engineering building(Elastos.ORG.Wallet.Mobile.git )

## replace package named "android.jar "in the sdk 
because chromium will use some api which is not disclosed in the android sdk, we need to replace the file named "android.jar" in the public sdk. The file is already copied to "ElastosWebRT" under the ds branch of Elastos.ORG.Wallet.Mobile.git warehouse
（in fact use "chromium_src/.cipd/pkgs/35/_current/android_system.jar" to replace
"android-sdk/platforms/android-26/android.jar"）


## download code
git clone git@github.com:elastos/Elastos.ORG.Wallet.Mobile.git wallet

these processed "so and jar" package can be compiled directly, follwing steps need to be used on the condition that chromius is changing：

## if modify c++ file, need to replace reated "so"
    a. copy "so"file under the directory"lib/armeabi-v7a" inside "ElastosWebRT.apk" to the path "platforms/android/app/src/main/jniLibs/armeabi-v7a"；

## if modify java file, need to replace jar package and resource files under "assets"，and need to obey ahead compiling way of chromium to operate
    b. copy "elastos_webrt_java.jar" to the directory "platforms/android/CordovaLib/libs"；

    c. copy "icudtl.dat,natives_blob.bin,snapshot_blob_32.bin,content_shell.pak" under the directory "assets" inside "ElastosWebRT.apk", to the directoy "  platforms/android/app/src/main/assets"

        add some lines of code inside the file "platforms/android/app/build.gradle"
         aaptOptions {
             noCompress 'dat', 'bin', 'pak'
         }

following d and e steps would not be modified usually：

    d. add several items related "SandboxedProcess"inside to" platforms/android/app/src/main/AndroidManifest.xml"：
    --- a/platforms/android/app/src/main/AndroidManifest.xml
    +++ b/platforms/android/app/src/main/AndroidManifest.xml
    @@ -99,6 +99,138 @@
             </receiver>
             <meta-data android:name="JPUSH_CHANNEL" android:value="developer-default" />
             <meta-data android:name="JPUSH_APPKEY" android:value="ce32fee188af2d3284b0c24e" />
    +
    +        <meta-data
    +            android:name="org.chromium.content.browser.NUM_SANDBOXED_SERVICES"
    +            android:value="20" />
    +
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService0"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process0" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService1"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process1" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService2"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process2" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService3"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process3" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService4"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process4" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService5"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process5" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService6"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process6" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService7"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process7" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService8"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process8" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService9"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process9" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService10"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process10" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService11"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process11" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService12"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process12" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService13"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process13" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService14"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process14" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService15"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process15" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService16"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process16" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService17"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process17" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService18"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process18" />
    +        <service
    +            android:name="org.chromium.content.app.SandboxedProcessService19"
    +            android:exported="false"
    +            android:isolatedProcess="true"
    +            android:process=":sandboxed_process19" />
    +
    +        <meta-data
    +            android:name="org.chromium.content.browser.NUM_PRIVILEGED_SERVICES"
    +            android:value="3" />
    +
    +        <service
    +            android:name="org.chromium.content.app.PrivilegedProcessService0"
    +            android:exported="false"
    +            android:isolatedProcess="false"
    +            android:process=":privileged_process0" />
    +        <service
    +            android:name="org.chromium.content.app.PrivilegedProcessService1"
    +            android:exported="false"
    +            android:isolatedProcess="false"
    +            android:process=":privileged_process1" />
    +        <service
    +            android:name="org.chromium.content.app.PrivilegedProcessService2"
    +            android:exported="false"
    +            android:isolatedProcess="false"
    +            android:process=":privileged_process2" />
    +
    +        <meta-data
    +            android:name="org.chromium.content.browser.SMART_CLIP_PROVIDER"
    +            android:value="org.chromium.content.browser.SmartClipProvider" />
    +        <meta-data
    +            android:name="android.arch.lifecycle.VERSION"
    +            android:value="27.0.0-SNAPSHOT" />
         </application>
         <uses-sdk android:minSdkVersion="19" android:targetSdkVersion="21" />
         <uses-permission android:name="android.permission.CAMERA" />
    e. 将CordovaLib目录下的java文件替换为附件CordovaLib(从chromium/content/cordova/android/CordovaLib拷贝过来)文件夹。
    ElastosWebRT/CordovaLib ==> platforms/android/CordovaLib
	
	

## compile studio engineering，producing apk
    f. sync studio engineering，
