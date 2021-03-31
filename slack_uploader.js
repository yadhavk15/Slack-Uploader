const { App } = require('@slack/bolt');

const app = new App({
    token: "",
    signingSecret: ""
});

const fs = require('fs');
const http = require('http');

const slugify = text => text.toString();

const saveFilename = url => `${slugify(url)}`;

const successObject = {
    success: true,
};

const errorObject = {
    error: 'HTTP Method not supported',
};

const server = http.createServer((req, res) => {

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method !== 'PUT') {
        res.end(JSON.stringify(errorObject));
        return;
    }

    const saveName = saveFilename(req.url);

    // create writable stream
    const namefile = `/tmp/${Math.random().toString(20).substr(2, 3)}:${saveName.substr(1, saveName.length)}`
    const file = fs.createWriteStream(namefile);

    // pipe req data to file stream
    req.pipe(file);

    // send success response on end
    req.on('end', () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(successObject));
        res.end();
    });

    const { createReadStream } = require('fs');
    setTimeout(async function () {
        try {

            console.log(`${namefile}`);

            const result = app.client.files.upload({
                token: "",
                channels: "", // channel_id
                initial_comment: `:aussieparrot: Here\'s your file ${saveName.substr(1, saveName.length)} `,
                file: createReadStream(`${namefile}`)
            });
        }
        catch (error) {
            console.error(error);
        }
    }, 0.1 * 60 * 1000);

    // error handler
    req.on('error', e => {
        console.error(`problem with request: ${e.message}`);
    });
    // log request
    console.log(`${new Date()} ${req.connection.remoteAddress} ${namefile}`);
});

server.listen(3005, () =>
    console.log(`Server running at http://localhost:3005/`)
);

app.error((error) => {
    console.error(error);
});

(async () => {
    await app.start(process.env.PORT || 3006);
    console.log('Uploader here to party');
})();
