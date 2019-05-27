const net = require('net');
const childProcess = require('child_process');

const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => {
    client.connect(
        { port },
        () => {
            client.end();
            if (!startedElectron) {
                console.log('starting electron');
                startedElectron = true;
                const electron = childProcess.spawn('electron', ['.']);

                electron.stdout.on('data', (data) => console.log(data.toString()));
                electron.stderr.on('data', (data) => console.error(data.toString()));
            }
        }
    )
};

tryConnection();

client.on('error', () => {
    setTimeout(tryConnection, 1000)
});