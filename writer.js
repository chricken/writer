'use strict';

import express from 'express';
import routes from './routes.js';
import db from './db.js';
const server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

server.use(express.json());
server.use(routes);

const init = () => {
    db.init().then(
        () => {
            server.listen(1084, err => {
                if (err) console.log(err);
                else console.log('Server läuft');
            })
        }
    ).catch(
        console.warn        
    )
}

init();