require('app-module-path').addPath(`${__dirname}`);

global.R = require('ramda');

module.exports = (App, window) => {

    const ipc = require('electron').ipcMain;

    const Api = require('express')();
    const HTTP = require('http').Server(Api);
    const IO = require('socket.io')(HTTP);

    require('game/Game').create();

    require('communication/routes/GameRoutes')(Api);
    require('communication/routes/PlayerRoutes')(Api);

    HTTP.listen(9001, () => console.log('listening on *:9001'));

};