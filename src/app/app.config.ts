export class AppConfig {

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
      path: "../www/assets/imgs/slice2.png",
      name: "CarTest",
      url: "hello/www/index.html",
      size: "666 KB",
      date: AppConfig.currentDateYYYYMMDD
    }, {
      path: "assets/imgs/slice2.png",
      name: "dApp4",
      url: "hello/www/index.html",
      size: "888 KB",
      date: AppConfig.currentDateYYYYMMDD
    }, {
      path: "assets/imgs/slice2.png",
      name: "dApp5",
      url: "hello/www/index.html",
      size: "999 KB",
      date: AppConfig.currentDateYYYYMMDD
    }
  ];

}
