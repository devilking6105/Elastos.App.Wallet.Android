webpackJsonp([2],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InfoPage = /** @class */ (function () {
    function InfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    InfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InfoPage');
    };
    InfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-info',template:/*ion-inline-start:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\pages\info\info.html"*/'<!--\n\n  Generated template for the InfoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>info</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n  \n\n<ion-content>\n\n  <ion-grid>\n\n    <ion-list no-lines>\n\n      <ion-row>\n\n        <ion-item>\n\n          <ion-thumbnail item-start class="up-app">\n\n            <img src="assets/imgs/slice2.png">\n\n          </ion-thumbnail>\n\n          <h2>My Neighbor Totoro</h2>\n\n          <p>My Neighbor Totoro</p>\n\n          <p>Hayao Miyazaki • 1988</p>\n\n        </ion-item>\n\n      </ion-row>\n\n    <ion-list-header>Permissions</ion-list-header>\n\n\n\n    </ion-list>\n\n      <ion-list no-lines>\n\n        <ion-row>\n\n          <ion-item *ngFor="let item of appManageList, let i = index">\n\n            <ion-checkbox color="dark" checked="true"></ion-checkbox>\n\n            <ion-thumbnail item-start>\n\n              <img src="assets/imgs/camera.png" alt="">\n\n            </ion-thumbnail>\n\n            <ion-thumbnail item-start>\n\n                <h2>My Neighbor Totoro</h2>\n\n                <p>Hayao Miyazaki • 1988</p>\n\n            </ion-thumbnail>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-checkbox color="dark" checked="true"></ion-checkbox>\n\n            <ion-thumbnail item-start>\n\n              <img src="assets/imgs/camera.png">\n\n            </ion-thumbnail>\n\n            <ion-thumbnail item-start>\n\n                <h2>My Neighbor Totoro</h2>\n\n                <p>Hayao Miyazaki • 1988</p>\n\n            </ion-thumbnail>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-checkbox color="dark" checked="true"></ion-checkbox>\n\n            <ion-thumbnail item-start>\n\n                <img src="assets/imgs/id.png">\n\n            </ion-thumbnail>\n\n            <ion-thumbnail item-start>\n\n                <h2>My Neighbor Totoro</h2>\n\n                <p>Hayao Miyazaki • 1988</p>\n\n            </ion-thumbnail>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-checkbox color="dark" checked="true"></ion-checkbox>\n\n            <ion-thumbnail item-start>\n\n                <img src="assets/imgs/speaker.png">\n\n            </ion-thumbnail>\n\n            <ion-thumbnail item-start>\n\n                <h2>My Neighbor Totoro</h2>\n\n                <p>Hayao Miyazaki • 1988</p>\n\n            </ion-thumbnail>\n\n          </ion-item>\n\n        </ion-row>\n\n        <ion-list-header>Infomation</ion-list-header>\n\n\n\n      </ion-list>\n\n  </ion-grid>\n\n</ion-content>\n\n  \n\n  \n\n'/*ion-inline-end:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\pages\info\info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_chooser__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_zip__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__info_info__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManagePage = /** @class */ (function () {
    function ManagePage(navCtrl, navParams, file, fileChooser, filePath, zip) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.file = file;
        this.fileChooser = fileChooser;
        this.filePath = filePath;
        this.zip = zip;
        this.checkIndex = []; // 复选框选中的应用集合
        this.isShow = false;
        this.appList = []; // 应用列表
        __WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* AppConfig */].initAppListData();
        this.appList = __WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* AppConfig */].getAppListData();
    }
    /**
     *
     * @desc  页面跳转
     */
    ManagePage.prototype.goInfo = function (index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__info_info__["a" /* InfoPage */]);
    };
    /**
     *
     * @desc 列表选中
     */
    ManagePage.prototype.checkApp = function (item) {
        item.checked = !item.checked;
        if (this.checkIndex.indexOf(item) < 0) {
            this.checkIndex.push(item);
        }
        else {
            this.checkIndex.splice(this.checkIndex.indexOf(item), 1);
        }
        if (this.checkIndex.length > 0) {
            this.isShow = true;
        }
        else {
            this.isShow = false;
        }
    };
    /**
     *
     * @desc   删除操作
     */
    ManagePage.prototype.doDel = function () {
        var that = this;
        this.checkIndex.forEach(function (item) {
            var path = that.file.externalRootDirectory + __WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* AppConfig */].appName + "/";
            var dir = item.url.substr(0, item.url.lastIndexOf("/www/index.html"));
            // remove dir & info
            that.file.removeRecursively(path, dir)
                .then(function (result) {
                if (result) {
                    that.appList.splice(that.appList.indexOf(item), 1);
                    __WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* AppConfig */].saveAppListData(that.appList);
                }
                else {
                    alert("remove this app " + item.name + " failed!");
                }
            }).catch(function (err) { return alert(JSON.stringify(err)); });
        });
        this.checkIndex = [];
    };
    /**
     *
     * @desc 添加应用
     */
    ManagePage.prototype.importFromEpk = function () {
        var _this = this;
        var destDir = this.file.externalRootDirectory + __WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* AppConfig */].appName + "/";
        // choose *.epk
        this.fileChooser.open()
            .then(function (fileFullUri) {
            // for chinese file name
            var chooseFile = decodeURI(fileFullUri);
            // get file size
            var fileSize = "0MB";
            _this.file.resolveLocalFilesystemUrl(fileFullUri)
                .then(function (fileEntry) {
                fileEntry.getMetadata(function (metadata) {
                    // fileSize = this.fileTurnSize(metadata.size);
                    fileSize = metadata.size >= 1048576 ? (metadata.size / 1048576).toFixed(2) + " MB" : (metadata.size / 1024).toFixed(2) + " KB";
                }, function (error) {
                    alert(error.message);
                });
            }).catch(function (err) { return alert(JSON.stringify(err)); });
            // get file path
            _this.filePath.resolveNativePath(chooseFile)
                .then(function (fileFullPath) {
                var fileFullName = fileFullPath.substr(fileFullPath.lastIndexOf("/") + 1);
                var fileName = fileFullName.substr(0, fileFullName.lastIndexOf("."));
                var fileType = fileFullPath.substr(fileFullPath.lastIndexOf(".")).toLowerCase();
                // check the file type
                if (fileType != ".epk") {
                    alert("please choose epk file formats!");
                }
                else {
                    // unzip *.epk to sdcard
                    _this.zip.unzip(fileFullPath, destDir)
                        .then(function (unzipResult) {
                        if (unzipResult === -1) {
                            alert("unzip this file failed!");
                        }
                        else if (unzipResult === 0) {
                            var infoFilePath_1 = destDir + fileName + "/www/";
                            var infoFileFullName_1 = "manifest.json";
                            // check if there exists info file
                            _this.file.checkFile(infoFilePath_1, infoFileFullName_1)
                                .then(function (isFileExists) {
                                if (isFileExists) {
                                    // read the info file
                                    _this.file.readAsText(infoFilePath_1, infoFileFullName_1)
                                        .then(function (jsonString) {
                                        // yyyy.MM.dd format date
                                        var currentDate = new Date();
                                        var currentMM = currentDate.getMonth() < 9 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
                                        var currentDD = currentDate.getDay() < 9 ? "0" + (currentDate.getDay() + 1) : (currentDate.getDay() + 1);
                                        // analyse the app info
                                        var info = JSON.parse(jsonString);
                                        _this.appList.push({
                                            path: "../" + fileName + "/www/" + info.icons[0].src,
                                            name: info.name,
                                            url: fileName + '/www/index.html',
                                            size: fileSize,
                                            date: currentDate.getFullYear() + "." + currentMM + "." + currentDD
                                        });
                                        // save app list
                                        __WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* AppConfig */].saveAppListData(_this.appList);
                                    }).catch(function (err) { return alert(JSON.stringify(err)); });
                                }
                                else {
                                    alert("this file is broken!");
                                }
                            }).catch(function (err) { return alert(JSON.stringify(err)); });
                        }
                    }).catch(function (err) { return alert(JSON.stringify(err)); });
                }
            }).catch(function (err) { return alert(JSON.stringify(err)); });
        }).catch(function (err) { return alert(JSON.stringify(err)); });
    };
    ManagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manage',template:/*ion-inline-start:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\pages\manage\manage.html"*/'<!--\n  Generated template for the ManagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>manage</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only>\n        <ion-icon>\n          <img class="icon-right" src="assets/imgs/switch.png" alt="">\n        </ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button ion-button icon-only>\n        <ion-icon><img class="icon-right" src="assets/imgs/shut.png" alt=""></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n  <ion-card class="import-box">\n    <button ion-button icon-only (click)="importFromEpk()">\n        <ion-icon>\n          <img class="icon-right" src="assets/imgs/add.png" alt="">\n        </ion-icon>\n      </button>\n    <ion-card-content>\n      <div class="title">Import from Local file</div>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-list no-lines>\n    <ion-item *ngFor="let item of appList, let i = index">\n      <ion-checkbox color="dark" ng-checked="checked" (click) = \'checkApp(item)\'></ion-checkbox>\n      <ion-thumbnail item-start>\n        <img src={{item.path}} alt="">\n      </ion-thumbnail>\n      <ion-thumbnail item-start>\n          <h2>{{item.name}}</h2>\n          <p>{{item.size}}</p>\n          <p>Added {{item.date}}</p>\n        </ion-thumbnail>\n        <button ion-button clear item-end  (click)="goInfo(i)">\n            <img class="right_arrow" src="assets/imgs/arrow.png">\n        </button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer *ngIf="isShow">\n  <ion-row>\n    <ion-col col-6>\n        <ion-card class="card-box card-export">\n            Export\n        </ion-card>\n    </ion-col>\n    <ion-col col-6>\n        <ion-card class="card-box card-delete" (click)="doDel()">\n            Delete\n        </ion-card>\n    </ion-col>\n  </ion-row>\n</ion-footer>\n\n'/*ion-inline-end:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\pages\manage\manage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_zip__["a" /* Zip */]])
    ], ManagePage);
    return ManagePage;
}());

//# sourceMappingURL=manage.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/info/info.module": [
		279,
		1
	],
	"../pages/manage/manage.module": [
		280,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
// import {File} from '@ionic-native/file';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    AppConfig.initAppListData = function () {
        if (null == window.localStorage.getItem('appList')) {
            AppConfig.saveAppListData(AppConfig.initAppList);
        }
    };
    AppConfig.getAppListData = function () {
        return JSON.parse(window.localStorage.getItem('appList'));
    };
    AppConfig.saveAppListData = function (appList) {
        window.localStorage.setItem('appList', JSON.stringify(appList));
    };
    /*
    app info
     */
    AppConfig.appName = "elastos";
    AppConfig.currentDate = new Date();
    AppConfig.currentDateYYYYMMDD = AppConfig.currentDate.getFullYear() + "."
        + (AppConfig.currentDate.getMonth() < 9 ? "0" + (AppConfig.currentDate.getMonth() + 1) : (AppConfig.currentDate.getMonth() + 1)) + "."
        + (AppConfig.currentDate.getDay() < 9 ? "0" + (AppConfig.currentDate.getDay() + 1) : (AppConfig.currentDate.getDay() + 1));
    AppConfig.initAppList = [
        {
            path: "../wallet/www/assets/images/logo.png",
            name: "Wallet",
            url: "wallet/www/index.html",
            size: "1 MB",
            date: AppConfig.currentDateYYYYMMDD
        }, {
            path: "../todo/www/assets/imgs/logo.png",
            name: "ToDO",
            url: "todo/www/index.html",
            size: "2 MB",
            date: AppConfig.currentDateYYYYMMDD
        }, {
            path: "../CarTest/www/assets/imgs/logo.png",
            name: "CarTest",
            url: "CarTest/www/index.html",
            size: "666 KB",
            date: AppConfig.currentDateYYYYMMDD
        }, {
            path: "../dApp4/www/assets/imgs/logo.png",
            name: "dApp4",
            url: "dApp4/www/index.html",
            size: "888 KB",
            date: AppConfig.currentDateYYYYMMDD
        }, {
            path: "../dApp5/www/assets/imgs/logo.png",
            name: "dApp5",
            url: "dApp5/www/index.html",
            size: "999 KB",
            date: AppConfig.currentDateYYYYMMDD
        }
    ];
    return AppConfig;
}());

//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manage_manage__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, file) {
        this.navCtrl = navCtrl;
        this.file = file;
        this.checked = false; // 删除按钮是否激活，激活时隐去跳转管理页面的按钮
        __WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* AppConfig */].initAppListData();
    }
    HomePage.prototype.getAppList = function () {
        return __WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* AppConfig */].getAppListData();
    };
    HomePage.prototype.goManage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__manage_manage__["a" /* ManagePage */]);
    };
    HomePage.prototype.pressEvent = function () {
        this.checked = true;
    };
    HomePage.prototype.delEvent = function (index) {
        var appList = __WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* AppConfig */].getAppListData();
        var item = appList[index];
        var path = this.file.externalRootDirectory + __WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* AppConfig */].appName + "/";
        var dir = item.url.substr(0, item.url.lastIndexOf("/www/index.html"));
        // remove dir & info
        this.file.removeRecursively(path, dir)
            .then(function (result) {
            if (result) {
                appList.splice(index, 1);
                __WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* AppConfig */].saveAppListData(appList);
            }
            else {
                alert("remove this app " + item.name + " failed!");
            }
        }).catch(function (err) { return alert(JSON.stringify(err)); });
        this.checked = false;
    };
    HomePage.prototype.tapEvent = function () {
        this.checked = false;
    };
    HomePage.prototype.onClick = function (item) {
        if (this.checked) {
            return false;
        }
        else {
            cordova.plugins.TestPlugin.coolMethod(item.url, function (data) { }, function (error) { });
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\pages\home\home.html"*/'\n<ion-content>\n    <ion-grid>\n        <ion-row>\n          <ion-col col-3 class="manage-box">\n              <button ion-button clear>\n                <img *ngIf="!checked" (click)="goManage()" class="manage-btn" src="assets/imgs/manage.png" alt="">\n              </button>\n          </ion-col>\n          <ion-col col-21 (tap)="tapEvent($event)"></ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-3 *ngFor="let item of getAppList(), let i = index" (press)="pressEvent()" (click)="onClick(item)">\n            <img src={{item.path}} alt="">\n            <span *ngIf="checked" class="del-ioc" (click)="delEvent(i)"></span>\n            <div class="app-title">{{item.name}}</div>\n          </ion-col>\n        </ion-row>\n    </ion-grid>\n    <ion-grid class="grid-down" (tap)="tapEvent($event)"></ion-grid>\n</ion-content>\n'/*ion-inline-end:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_manage_manage__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_info_info__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_chooser__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_path__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_sqlite__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_zip__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




 // 引入模块










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_manage_manage__["a" /* ManagePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_info_info__["a" /* InfoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                // IonicModule.forRoot(MyApp)
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    tabsHideOnSubPages: 'true',
                    backButtonText: '' /*配置返回按钮*/
                }, {
                    links: [
                        { loadChildren: '../pages/info/info.module#InfoPageModule', name: 'InfoPage', segment: 'info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/manage/manage.module#ManagePageModule', name: 'ManagePage', segment: 'manage', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_manage_manage__["a" /* ManagePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_info_info__["a" /* InfoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_zip__["a" /* Zip */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            alert(location.search);
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__localimport_localimport__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__localimport_localimport__["a" /* LocalimportComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__localimport_localimport__["a" /* LocalimportComponent */]) // <- Add
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__localimport_localimport__["a" /* LocalimportComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalimportComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the LocalimportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var LocalimportComponent = /** @class */ (function () {
    function LocalimportComponent() {
        console.log('Hello LocalimportComponent Component');
        this.text = 'Hello World';
    }
    LocalimportComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'localimport',template:/*ion-inline-start:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\components\localimport\localimport.html"*/'<!-- Generated template for the LocalimportComponent component -->\n\n<!-- <div>\n\n  {{text}}\n\n</div> -->\n\n<!-- <style>\n\n   .import-box {\n\n    background-color: #0064D7;\n\n    height: 112px; \n\n    text-align: center;\n\n    font-size: 22px;\n\n    color: #fff;\n\n    border-radius: 10px;\n\n  }\n\n  .import-box .button-ios {\n\n    background-color: #0064D7;\n\n  }\n\n  /* .import-box .button-ios img {\n\n    \n\n  } */\n\n</style> -->\n\n\n\n<div>\n\n  <button ion-button icon-only>\n\n    <ion-icon>\n\n      <img class="icon-right" src="../../assets/imgs/add.png" alt="">\n\n    </ion-icon>\n\n  </button>\n\n  <ion-card-content>\n\n    <!-- Add card content here! -->\n\n    <div class="title">Import from Local file</div>\n\n  </ion-card-content>\n\n</div>\n\n'/*ion-inline-end:"D:\WorkSpace\Android\Elastos.ORG.Wallet.Mobile\src\components\localimport\localimport.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], LocalimportComponent);
    return LocalimportComponent;
}());

//# sourceMappingURL=localimport.js.map

/***/ })

},[201]);
//# sourceMappingURL=main.js.map