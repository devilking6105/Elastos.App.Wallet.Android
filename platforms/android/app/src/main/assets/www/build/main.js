webpackJsonp([2],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info_info__ = __webpack_require__(99);
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
    function ManagePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iconManagelist = [
            { path: 'assets/imgs/slice2.png', name: 'daPP1', size: '1256kb', date: 'Added 2017.08.07' },
            { path: 'assets/imgs/slice2.png', name: 'daPP2', size: '1256kb', date: 'Added 2017.08.07' },
            { path: 'assets/imgs/slice2.png', name: 'daPP3', size: '1256kb', date: 'Added 2017.08.07' },
            { path: 'assets/imgs/slice2.png', name: 'daPP4', size: '1256kb', date: 'Added 2017.08.07' },
            { path: 'assets/imgs/slice2.png', name: 'daPP5', size: '1256kb', date: 'Added 2017.08.07' }
        ];
        this.appManageList = [];
        window.localStorage.setItem('iconManagelist', JSON.stringify(this.iconManagelist));
        this.appManageList = JSON.parse(window.localStorage.getItem('iconManagelist'));
        console.log(this.appManageList);
    }
    ManagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ManagePage');
    };
    ManagePage.prototype.goInfo = function (index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__info_info__["a" /* InfoPage */]);
    };
    ManagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manage',template:/*ion-inline-start:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\pages\manage\manage.html"*/'<!--\n  Generated template for the ManagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<style>\n  .content-ios {\n    background-color: #ccc;\n    background: url(assets/imgs/timg.jpg) center center no-repeat;\n    background-size:100% 100%;\n  }\n  .toolbar-ios {\n    /* opacity: 0; */\n    background: rgba(red, green, blue, 0)\n  }\n    .right_arrow {\n      height: 12px;\n    }\n    .icon-right {\n      width: 24px;\n    }\n    .item-ios {\n      background-color: rgba(red, green, blue, 0);\n    }\n    .import-box {\n      background-color: #0064D7;\n      height: 112px; \n      text-align: center;\n      font-size: 22px;\n      color: #fff;\n      border-radius: 10px;\n    }\n    .import-box .button-ios {\n      background-color: #0064D7;\n    }\n    .card-box {\n    height: 50px;\n    text-align: center;\n    line-height: 50px;\n    font-size: 16px;\n    color: #fff;\n    border-radius: 5px;\n  }\n  .card-export {\n    background-color: #0064D7;\n  }\n  .card-delete {\n    background-color: #D0021B;\n  }\n  </style>\n  <ion-header>\n    <ion-navbar>\n      <ion-title>manage</ion-title>\n\n      <ion-buttons end>\n        <button ion-button icon-only>\n          <ion-icon>\n            <img class="icon-right" src="assets/imgs/switch.png" alt="">\n          </ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-buttons end>\n        <button ion-button icon-only>\n          <ion-icon><img class="icon-right" src="assets/imgs/shut.png" alt=""></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content>\n  <ion-card class="import-box">\n    <button ion-button icon-only>\n        <ion-icon>\n          <img class="icon-right" src="assets/imgs/add.png" alt="">\n        </ion-icon>\n      </button>\n    <ion-card-content>\n      <div class="title">Import from Local file</div>\n    </ion-card-content>\n    \n  </ion-card>\n      <ion-list no-lines>\n        <ion-item *ngFor="let item of appManageList, let i = index">\n          <ion-checkbox color="dark" checked="true"></ion-checkbox>\n          <ion-thumbnail item-start>\n            <img src={{item.path}} alt="">\n          </ion-thumbnail>\n          <ion-thumbnail item-start>\n              <h2>{{item.name}}</h2>\n              <p>{{item.size}}</p>\n              <p>{{item.date}}</p>\n            </ion-thumbnail>\n            <button ion-button clear item-end  (click)="goInfo(i)">\n                <img class="right_arrow" src="assets/imgs/arrow.png">\n            </button>\n        </ion-item>\n      </ion-list>\n    <!-- </ion-card> -->\n  </ion-content>\n\n  <ion-footer>\n    <ion-row>\n      <ion-col col-6>\n          <ion-card class="card-box card-export">\n              Export\n          </ion-card>\n      </ion-col>\n      <ion-col col-6>\n          <ion-card class="card-box card-delete">\n              Delete\n          </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-footer>\n  \n'/*ion-inline-end:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\pages\manage\manage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ManagePage);
    return ManagePage;
}());

//# sourceMappingURL=manage.js.map

/***/ }),

/***/ 110:
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
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/info/info.module": [
		273,
		1
	],
	"../pages/manage/manage.module": [
		274,
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
webpackAsyncContext.id = 151;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_manage__ = __webpack_require__(100);
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
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.press = 0;
        this.iconList = [{ path: 'assets/imgs/slice2.png', name: 'daPP1', url: 'file:///android_asset/todo/www/index.html' },
            { path: 'assets/imgs/slice2.png', name: 'daPP2', url: 'file:///android_asset/todo/www/index.html' },
            { path: 'assets/imgs/slice2.png', name: 'daPP3', url: 'file:///android_asset/todo/www/index.html' },
            { path: 'assets/imgs/slice2.png', name: 'daPP4', url: 'file:///android_asset/hello/www/index.html' },
            { path: 'assets/imgs/slice2.png', name: 'daPP5', url: 'file:///android_asset/hello/www/index.html' }];
        this.appList = [];
        window.localStorage.setItem('iconlist', JSON.stringify(this.iconList));
        this.appList = JSON.parse(window.localStorage.getItem('iconlist'));
        console.log(this.appList);
    }
    HomePage.prototype.goManage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__manage_manage__["a" /* ManagePage */]);
    };
    HomePage.prototype.pressEvent = function (e, index) {
        this.appList.splice(index, 1);
    };
    HomePage.prototype.onClick = function () {
        cordova.plugins.TestPlugin.coolMethod(iconList[1].url, function (data) { }, function (error) { });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\pages\home\home.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<style>\n  .content-ios {\n    background-color: #ccc;\n    background: url(assets/imgs/timg.jpg) center center no-repeat;\n    background-size:100% 100%;\n  }\n  .app-box {\n    width: 80%;\n    background-color: #888;\n    border-radius: 5px; \n  }\n  .app-box img {\n    padding: 10px;\n  }\n  .app-title {\n    color: #888;\n    /* font-family:  */\n    text-align: center;\n    padding: 10px 0;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow:hidden;\n  }\n  .item-ios {\n    background-color: #eef5f9;\n  }\n  [col-3] {\n    padding: 22px 11px 0;\n  }\n  .manage-btn {\n    height: 18px;\n  }\n  .manage-box .button-ios {\n    margin: 0;\n    padding: 0;\n  }\n</style>\n<!-- <ion-header>\n    <ion-toolbar>\n      <ion-buttons start>\n        <button ion-button icon-only>\n          <ion-icon name="more"></ion-icon>\n        </button>\n      </ion-buttons>\n  \n      <ion-title>Header</ion-title>\n  \n      <ion-buttons end>\n        <button ion-button icon-only>\n          <ion-icon name="search"></ion-icon>\n        </button>\n      </ion-buttons>\n  \n    </ion-toolbar>\n  </ion-header> -->\n\n<ion-content>\n    <ion-grid>\n        <ion-row>\n          <ion-col col-3 class="manage-box">\n              <button ion-button clear>\n                <img (click)="goManage()" class="manage-btn" src="assets/imgs/manage.png" alt="">\n              </button>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-3 *ngFor="let item of appList, let i = index" (press)="pressEvent($event,i)" (click)="onClick()">\n            <img src={{item.path}} alt="">\n            <div class="app-title">{{item.name}}</div>\n          </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object])
    ], HomePage);
    return HomePage;
    var _a;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_manage_manage__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_info_info__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(194);
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
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(195);
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
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__localimport_localimport__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
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

/***/ 272:
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
            selector: 'localimport',template:/*ion-inline-start:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\components\localimport\localimport.html"*/'<!-- Generated template for the LocalimportComponent component -->\n<!-- <div>\n  {{text}}\n</div> -->\n<!-- <style>\n   .import-box {\n    background-color: #0064D7;\n    height: 112px; \n    text-align: center;\n    font-size: 22px;\n    color: #fff;\n    border-radius: 10px;\n  }\n  .import-box .button-ios {\n    background-color: #0064D7;\n  }\n  /* .import-box .button-ios img {\n    \n  } */\n</style> -->\n\n<div>\n  <button ion-button icon-only>\n    <ion-icon>\n      <img class="icon-right" src="../../assets/imgs/add.png" alt="">\n    </ion-icon>\n  </button>\n  <ion-card-content>\n    <!-- Add card content here! -->\n    <div class="title">Import from Local file</div>\n  </ion-card-content>\n</div>\n'/*ion-inline-end:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\components\localimport\localimport.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], LocalimportComponent);
    return LocalimportComponent;
}());

//# sourceMappingURL=localimport.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
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
            selector: 'page-info',template:/*ion-inline-start:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\pages\info\info.html"*/'<!--\n  Generated template for the InfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>info</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<style>\n  .content-ios {\n    background-color: #ccc;\n    background: url(../assets/imgs/timg.jpg) center center no-repeat;\n    background-size:100% 100%;\n  }\n    .icon-right {\n      width: 24px;\n    }\n    .content-ios {\n      background-color: #eef5f9;\n  }\n    .item-ios {\n      background-color: #eef5f9;\n    }\n    .item-ios .up-app ion-img, .item-ios .up-app img {\n      width: 56px;\n      height: inherit;\n    }\n  </style>\n  \n  <ion-content>\n    <ion-grid>\n      <ion-list no-lines>\n        <ion-row>\n          <ion-item>\n            <ion-thumbnail item-start class="up-app">\n              <img src="assets/imgs/slice2.png">\n            </ion-thumbnail>\n            <h2>My Neighbor Totoro</h2>\n            <p>My Neighbor Totoro</p>\n            <p>Hayao Miyazaki • 1988</p>\n          </ion-item>\n        </ion-row>\n      <ion-list-header>Permissions</ion-list-header>\n\n      </ion-list>\n        <ion-list no-lines>\n          <ion-row>\n            <ion-item *ngFor="let item of appManageList, let i = index">\n              <ion-checkbox color="dark" checked="true"></ion-checkbox>\n              <ion-thumbnail item-start>\n                <img src="assets/imgs/camera.png" alt="">\n              </ion-thumbnail>\n              <ion-thumbnail item-start>\n                  <h2>My Neighbor Totoro</h2>\n                  <p>Hayao Miyazaki • 1988</p>\n              </ion-thumbnail>\n            </ion-item>\n\n            <ion-item>\n              <ion-checkbox color="dark" checked="true"></ion-checkbox>\n              <ion-thumbnail item-start>\n                <img src="assets/imgs/camera.png">\n              </ion-thumbnail>\n              <ion-thumbnail item-start>\n                  <h2>My Neighbor Totoro</h2>\n                  <p>Hayao Miyazaki • 1988</p>\n              </ion-thumbnail>\n            </ion-item>\n\n            <ion-item>\n              <ion-checkbox color="dark" checked="true"></ion-checkbox>\n              <ion-thumbnail item-start>\n                  <img src="assets/imgs/id.png">\n              </ion-thumbnail>\n              <ion-thumbnail item-start>\n                  <h2>My Neighbor Totoro</h2>\n                  <p>Hayao Miyazaki • 1988</p>\n              </ion-thumbnail>\n            </ion-item>\n\n            <ion-item>\n              <ion-checkbox color="dark" checked="true"></ion-checkbox>\n              <ion-thumbnail item-start>\n                  <img src="assets/imgs/speaker.png">\n              </ion-thumbnail>\n              <ion-thumbnail item-start>\n                  <h2>My Neighbor Totoro</h2>\n                  <p>Hayao Miyazaki • 1988</p>\n              </ion-thumbnail>\n            </ion-item>\n          </ion-row>\n          <ion-list-header>Infomation</ion-list-header>\n\n        </ion-list>\n    </ion-grid>\n  </ion-content>\n  \n  \n  <!-- <ion-content>\n    <ion-list>\n      <ion-list-header>Follow us on Twitter</ion-list-header>\n      <ion-item>\n        <ion-icon name="ionic" item-start></ion-icon>\n        @ionicframework\n      </ion-item>\n    </ion-list>\n  </ion-content> -->\n  \n'/*ion-inline-end:"D:\localproject\Elastos.ORG.Wallet.Mobile\src\pages\info\info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map