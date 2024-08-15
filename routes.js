'use strict';

import { Router } from 'express';
import db from './db.js';

const router = Router();

router.get('/allStories', (request, response) => {
    db.loadAllStories().then(
        res => response.json(res)
    ).catch(
        console.warn
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

export default router;