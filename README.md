## Elastos Desktop App

#####################应用开发人员环境准备##############################
1 把build目录下的android.jar包替换到AndroidSDK\platforms\android-26目录下的同名文件，原来的文件记得备份一下。
2 直接使用android Studio 打开 Elastos.ORG.Wallet.Mobile\platforms\android下的工程，直接Make Project 然后直接在手机上运行即可

目前的安装包里面内置了一个TODO的demo和一个car构件引用的demo

应用开发者使用ionic环境开发好的工程后，如果没有依赖特别的java的cordova插件，
直接把platforms\android\app\src\main\assets\www文件夹压缩为一个epk包，
即可在Elastos Trinity里面添加运行

epk包的目录结构说明如下 --todo










####################插件开发人员环境准备####################################
###  安装相关库

##### 安装 ionic|cordova
> npm install -g ionic cordova 
##### 安装 依赖包
> npm install


### 运行

#### 1、web端运行：
>ionic serve 
#### 2、安卓端运行：
>ionic cordova run android --device
#### 3、安卓端-调试模式：
> ionic cordova run android -l -c -s // 挂载本地页面、实时更新，需要选择本地IP
#### 4、android studio 加载项目启动：
> 因为网站是编译打包后webview从assets目录中加载，若从android studio直接启动安卓项目，建议重新执行2或3命令重新打包


---

### 项目结构

- src |网页代码
    - app/app-routing.module.ts |网站路由
    - pages |网站页面
    - providers/WalletManager.ts | cordova插件调用  
- www |打包后的网页代码
- platforms |平台
    - android |安卓项目
        - assets | 打包好的网站项目
        - jniLibs | 存放so动态库
        - com.elastos.spvcore.WalletManager | java->c++ jni 调用
        - ElaWallet.Wallet | java-js jni 调用
        - io.ionic.starter.MainActivity | 挂载webview的程序入口
- plungin-src | 钱包插件源码，通过命令自动添加到主项目中
    - plugin.xml |配置文件
    - www |  js代码 插件js接口
    - src |  java代码 插件java接口
- plugins |cordova 插件
    - ElaWallet | 钱包 插件 
       
        - anroid 与platforms下anroid相同，自动打包到项目中
        - 
### c++ 层
> 参看 https://github.com/elastos/Elastos.ELA.SPV.Cpp/tree/jni


### 基础命令
* 删除钱包插件: `ionic cordova plugin remove ElaWallet`
* 增加钱包插件: `cd plungin-src && ionic cordova plugin add  ElaWallet`
* 打包钱包插件: `cd .. && ionic cordova build android`
* `ionic cordova plugin remove ElaWallet && cd plungin-src && ionic cordova plugin add  ElaWallet && cd ..  && ionic cordova run android --device --prod`

### NDK使用版本
* android-ndk-r16b

### 打正式包指令
ionic cordova build android --release --prod





####################Elatos WebRT 说明####################################
# elastos_web_rt 说明
## 下载代码

```
$git clone https://github.com/elastos/Elastos.Trinity.android trinty
```

## 配置参数

```
$gn args out/arm
```

按照下面参数配置

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

## 编译

```
$ninja -C out/arm elastos_webrt_apk
```

生成的文件，我们需要两个：
Elastos.Trinity.android/src/out/arm/apks/ElastosWebRT.apk和Elastos.Trinity.android/src/out/arm/lib.java/elastos_webrt_java.jar

## 处理目标文件
由于我们需要把jar包和so提供给studio环境使用，而chromium构建中有部分代码是在生成apk时才自动填充，所以我们分离出的jar包目前需要手动替换，请按下面的步骤进行操作：

    a. 手动替换elastos_webrt_java.jar中nativelibrary，buildconfig目录下的class文件。
    用Elastos.Trinity.android/src/out/arm/gen/content/cordova/android/elastos_webrt_apk/elastos_webrt_apk.jar里的/org/chromium/base/
    替换Elastos.Trinity.android/src/out/arm/lib.java/elastos_webrt_java.jar里的/org/chromium/base/
    b. 删除elastos_webrt_java.jar中与AndroidStudio冲突的package(com.android.support)，目录如下：
    elastos_webrt_java.jar/android/support/v4

## ElastosWebRT 输出主要包含如下文件：
    elastos_webrt_java.jar(chromium java 层代码生成的jar包)
    cordovaLib (cordava 库代码)
    asset(dat，bin，pak即chromium相关资源文件)
    Build.gradle(diff)
    manifest.xml(diff)
    android.jar
使用方式有点复杂，但如果是基于Elastos.ORG.Wallet开发并不需要做这些复杂的操作，只需要clone 下来，替换一下sdk里的android.jar包就可以了。只有开发web engine的人员才需要处理。

# Studio 工程搭建(Elastos.ORG.Wallet.Mobile.git仓库)

## sdk 中的android.jar包替换
由于chromium会使用到部分android sdk未开放的api，所以需要替换公共发布的sdk里的android.jar文件，这个文件已经拷贝到Elastos.ORG.Wallet.Mobile.git仓库的ds分支ElastosWebRT目录下（该文件实际使用chromium_src/.cipd/pkgs/35/_current/android_system.jar替换
android-sdk/platforms/android-26/android.jar）


## 下载代码
git clone git@github.com:elastos/Elastos.ORG.Wallet.Mobile.git wallet

拉下来的代码使用chromium的so和jar包都是已经处理好的，直接编译即可，只有chromium发生变化才需要执行下面的步骤：

## 如果修改c++文件，需要替换相应so
    a. 将ElastosWebRT.apk中的lib/armeabi-v7a中的so文件拷贝到platforms/android/app/src/main/jniLibs/armeabi-v7a目录；

## 如果修改了Java文件，需要替换jar包和assets下的资源文件，并且需要按照前面chromium编译的方式处理
    b. 将elastos_webrt_java.jar拷贝到platforms/android/CordovaLib/libs目录；

    c. 将ElastosWebRT.apk中assets目录下的icudtl.dat,natives_blob.bin,snapshot_blob_32.bin,content_shell.pak文件拷贝到
       platforms/android/app/src/main/assets目录。
       在platforms/android/app/build.gradle 中添加如下几行
         aaptOptions {
             noCompress 'dat', 'bin', 'pak'
         }

下面d和e一般不需要再次修改：

    d. 在platforms/android/app/src/main/AndroidManifest.xml中添加SandboxedProcess相关的几项：
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
	
	

## 编译studio工程，生成对应apk
    f. sync studio工程，编译生成apk
