require('app-module-path').addPath(`${__dirname}/src`);

global.R = require('ramda');

module.exports = (App, window) => {

    const ipc = require('electron').ipcMain;

};