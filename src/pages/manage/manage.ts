import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Zip } from '@ionic-native/zip';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from "@ionic-native/file-path";

import { InfoPage } from '../info/info';
import { AppConfig } from "../../app/app.config";

/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {
  public appManageList = []
  public checkIndex = []
  public checked = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zip: Zip,
    public file: File,
    public fileChooser: FileChooser,
    public filePath: FilePath
  ) {
    if(null == window.localStorage.getItem('appList')) {
      window.localStorage.setItem('appList', JSON.stringify(AppConfig.initAppList));
    }
    this.appManageList = JSON.parse(window.localStorage.getItem('appList'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  /**
   *
   * @desc  页面跳转
   */
  goInfo(index) {
    this.navCtrl.push(InfoPage)
  }

  /**
   *
   * @desc   列表选中
   */
  checkApp(item, index) {
    item.checked = !item.checked
    if (item.checked) {
      if (this.checkIndex.indexOf(index) < 0) {
        this.checkIndex.push(index)
      }
    } else {
      if (this.checkIndex.indexOf(index) > 0) {
        this.checkIndex.splice(index, 1)
      }
    }
  }

  /**
   *
   * @desc 添加应用
   */
  importFromEpk() {
    let destDir = this.file.externalRootDirectory + "/elastos/";

    // choose *.epk
    this.fileChooser.open()
      .then(fileFullUri => {
        // for chinese file name
        let chooseFile = decodeURI(fileFullUri);

        // get file size
        let fileSize = "0MB";
        this.file.resolveLocalFilesystemUrl(fileFullUri)
          .then(fileEntry => {
            fileEntry.getMetadata(
              function (metadata) {
                // fileSize = this.fileTurnSize(metadata.size);
                fileSize = metadata.size >= 1048576 ? (metadata.size/1048576).toFixed(2) + "MB" : (metadata.size/1024).toFixed(2) + "KB";
              },
              function (error) {
                alert(error.message);
              }
            );
          })
          .catch(err => alert(err.toString()));

        // get file path
        this.filePath.resolveNativePath(chooseFile)
          .then(fileFullPath => {
            let fileFullName = fileFullPath.substr(fileFullPath.lastIndexOf("/") + 1);
            let fileName = fileFullName.substr(0, fileFullName.lastIndexOf("."));
            let fileType = fileFullPath.substr(fileFullPath.lastIndexOf(".")).toLowerCase();

            // check the file type
            if(fileType != ".epk") {
              alert("please choose epk file formats!");
            } else {
              // unzip *.epk to sdcard
              this.zip.unzip(fileFullPath, destDir)
                .then((unzipResult) => {
                  if(unzipResult === -1) {
                    alert("unzip this file failed!");
                  } else if(unzipResult === 0) {
                    let infoFilePath = destDir + fileName + "/www/";
                    let infoFileFullName = "manifest.json";
                    // check if there exists info file
                    this.file.checkFile(infoFilePath, infoFileFullName)
                      .then(isFileExists => {
                        if(isFileExists) {
                          // read the info file
                          this.file.readAsText(infoFilePath, infoFileFullName)
                            .then(jsonString => {
                              // analyse the app info
                              let info = JSON.parse(jsonString);
                              this.appManageList.push({
                                path: infoFilePath + info.icons[0].src,
                                name: info.name,
                                url: infoFilePath + 'index.html',
                                size: fileSize,
                                date: new Date().toISOString()
                              });
                              // save app list
                              window.localStorage.setItem('appList', JSON.stringify(this.appManageList));
                            }).catch(err => alert(err.toString()));
                        } else {
                          alert("this file is broken!");
                        }
                      }).catch(err => alert(err.toString()));
                  }
                }).catch(err => alert(err.toString()));
            }
          })
          .catch(err => alert(err.toString()));

      }).catch(err => alert(err.toString()));
  }

   /**
   *
   * @desc   删除操作
   */
  doDel() {
    var that = this
    this.checkIndex.forEach(function(item) {
      that.appManageList.splice(item, 1)
    })
    this.checkIndex = []
  }

  /**
   * @desc 获取便于阅读的文件大小
   * @param limit
   * @returns {string}
   */
  fileTurnSize(limit) {
    var size = "";
    if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B
      size = limit.toFixed(2) + "B";
    }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB
      size = (limit / 1024).toFixed(2) + "KB";
    }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB
      size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    }else{ //其他转化成GB
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if(dec == "00"){//当小数点后为00时 去掉小数部分
      return sizestr.substring(0,len) + sizestr.substr(len + 3,2);
    }
    return sizestr;
  }
}
