var exec = require('cordova/exec');

exports.StartApp = function (arg0, success, error) {
    exec(success, error, 'appmanager', 'StartApp', [arg0]);
};
