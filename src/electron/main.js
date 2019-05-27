const fs = require('fs');

let Settings = require('./settings/settings');
const JavaHelper = require('./helpers/JavaHelper');
const DelineateHelper = require('./helpers/DelineateHelper');

const R = require('ramda');

module.exports = (App, window) => {

    const ipc = require('electron').ipcMain;

    ipc.on('check-java', (event, arg) => {
        JavaHelper
            .getJavaVersion()
            .then((version) => event.sender.send('check-java-result', { success: true, data: version }))
            .catch((error) => event.sender.send('check-java-result', { success: false, data: error }));
    });

    ipc.on('get-settings', (event, arg) => {
        console.log('get-settings', arg);
        if (Array.isArray(arg)) {
            event.sender.send('settings-received', arg.reduce((map, setting) => {
                map[setting] = Settings[setting];
                return map;
            }, {}));
        }
    });

    ipc.on('set-settings', (event, arg) => {
       console.log('set-settings', arg);

       Settings = {...Settings, ...arg};
       fs.writeFileSync(`${__dirname}/settings/settings.json`, JSON.stringify(Settings));

       event.sender.send('settings-received', arg);
    });

    ipc.on('delineate', (event, arg) => {

        const { target, result } = DelineateHelper.delineate(R.head(arg), Settings);

        result.then(() => event.sender.send('delineate-complete', { target }));

    });

};