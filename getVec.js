const songName = "Hello";

const { exec } = require('child_process');

    // change to the python file you want to run
exec(`./getTopK.py ${songName}`, (err, stdout, stderr) => {

    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
