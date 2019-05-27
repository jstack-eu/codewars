const exec = require('child_process').exec;
const R = require('ramda');

const execute = (cmd) => new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {

        const data = { error, stdout, stderr };

        if (error) return resolve({ success: false, ...data });
        if (stderr) return resolve({ success: false, ...data });
        resolve({ success: true, ...data });

    });
});

const delineate = (path, settings) => {

    console.log(path, settings);

    const nameWithExtension = R.last(path.split('/'));
    const nameWithoutExtension = R.head(nameWithExtension.split('.'));
    const target = `${settings['delineate-target'][0]}/${nameWithoutExtension}.svg`;

    console.log(path, target);

    const result = execute(`../delineate/run.sh "${path}" "${target}"`).catch(error => console.log('Error while delineate', error));

    return { target, result};
};

module.exports = { delineate };