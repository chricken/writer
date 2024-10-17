'use strict';

import { Router } from 'express';
import db from './db.js';

const router = Router();

router.post('/allStories', (request, response) => {
    console.log('Load all Stories by', request.body);

    db.loadAllStories({
        userID: request.body.userID
    }).then(
        res => response.json(res)
    ).catch(
        console.warn
    )
})

router.delete('/deleteStory', (request, response) => {
    // console.log(request.body);
    db.deleteStory(request.body.id).then(
        () => response.json({
            status: 'done',
            msg: 'Story wurde gelöscht'
        })
    ).catch(
        err => {
            console.warn(err);
            response.json({
                status: 'err',
                msg: 'Etwas ist schief gelaufen'
            })
        }
    )
})

router.route('/story')
    .get((request, response) => {
        let requestedID = request.query.id;
        db.loadStory(requestedID).then(
            res => response.json(res)
        ).catch(
            console.warn
        );

    })
    .put((request, response) => {
        // console.log(request.body);
        db.saveStory(request.body).then(
            res => response.json(res)
        ).catch(
            console.warn
        )
    })

router.post('/login', (request, response) => {
    console.log('login', request.body);

    // Alle User mit dem Namen suchen
    db.findUser(request.body.username).then(
        res => {
            // Checken, ob der User das richtige Passwort trägt
            let success = res.some(user => user.pw == request.body.password);

            let payload = {
                status: 'ok',
                success,
                userID: res[0]._id,
                username: request.body.username
            }

            // console.log('findUser', res,  payload);

            response.json(payload)
        }
    ).catch(
        console.warn
    )
})

export default router;