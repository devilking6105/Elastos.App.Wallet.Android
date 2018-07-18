Elastos Wallet App

install ionic|cordova
npm install -g ionic cordova
install dependency package: 
npm install

execute: 

1、run in web ：
ionic serve
2、run in Android：
ionic cordova run android --device
3、run in Android - debug mode：
ionic cordova run android -l -c -s  
4、android studio ：

execute 2 or 3 if you would like to launch Android in Android Studio. 

--------------------------------------------------------------------------------
Code Structure
  ● src | web page source code
      ○ pages |web page
      ○ providers/WalletManager.ts | cordova plugin 
  ● www | web page code after build
  ● platforms |
      ○ android | Android project
          ■ assets | website after build
          ■ jniLibs | so dynamic lib
          ■ com.elastos.spvcore.WalletManager | java->c++ jni call
          ■ ElaWallet.Wallet | java-js jni call
          ■ io.ionic.starter.MainActivity | entry to load webview
  ● plungin-src | wallet plugin src code, added to mainproject
      ○ plugin.xml | config file
      ○ www | js plugin interface
      ○ src |  java plugin interface 
  ● plugins |cordova plugin
      ○ ElaWallet | Wallet Plugin
          ■ android | same as platforms/android, built to projects automatically
c++ layer
Please refer to:  https://github.com/elastos/Elastos.ELA.SPV.Cpp/tree/dev

Commands: 
  ● Remove ElaWallet Plugin: ionic cordova plugin remove ElaWallet
  ● Add ElaWallet Plugin: cd plungin-src && ionic cordova plugin add ElaWallet
  ● Build ElaWallet Plugin: cd .. && ionic cordova build android
  ● ionic cordova plugin remove ElaWallet && cd plungin-src && ionic cordova plugin add ElaWallet && cd .. && ionic cordova run android --device --prod

NDK version requied:
  ● android-ndk-r16b

Build Release Version: 
ionic cordova build android --release --prod
