'use strict';

import express from 'express';
const server = express();

server.use(express.static('public', {
    extensions:['html']
}));

const init = () => {
    server.listen(80, err => {
        if (err) console.log(err);
        else console.log('Server läuft');
    })
}

init();