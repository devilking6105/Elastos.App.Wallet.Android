export class AppConfig {

  static appName = "elastos";

  static currentDate = new Date();

  static currentMM = AppConfig.currentDate.getMonth() < 9 ? "0" + (AppConfig.currentDate.getMonth() + 1) : (AppConfig.currentDate.getMonth() + 1);

  static currentDD = AppConfig.currentDate.getDay() < 9 ? "0" + (AppConfig.currentDate.getDay() + 1) : (AppConfig.currentDate.getDay() + 1);

  static currentDateYYYYMMDD = AppConfig.currentDate.getFullYear()  + "." + AppConfig.currentMM  + "." + AppConfig.currentDD;

  static initAppList = [
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

}
