1  
ionic start myapp tabs
2 
ionic cordova platform add android
3 
ionic cordova plugin add D:\project\Elastos.ORG.Wallet.Mobile\appmanager
4 edit code 


1 将epk.js放到应用根目录下
2 安装编译依赖的archiver
npm install archiver --save
3  输入编译指令最后一个参数是epk的名称，比方说Messenger
ionic cordova build android --prod && node epk Messenger
ionic cordova build android --prod && node epk wallet
ionic cordova build android --prod && node epk CarTest
4 应用的根目录目录下就有对应的epk文件