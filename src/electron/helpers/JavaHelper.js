
const getJavaVersion = () => new Promise((resolve, reject) => {
    const spawn = require('child_process').spawn('java', ['-version']);

    spawn.on('error', (err) => reject(err));

    spawn.stderr.on('data', (data) => resolve(data.toString().split('\n')[0].split(' ')[2]));
});

module.exports = { getJavaVersion };
