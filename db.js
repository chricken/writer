'use strict';

import credentials from './data/credentials.json' assert { type: 'json' };
import nano from 'nano';
import settings from './settings.js';
const dbConn = nano(`http://${credentials.DBuser}:${credentials.DBPW}@${credentials.DBURL}`).db;

const db = {
    loadStory(id) {
        const myDB = dbConn.use(settings.dbNames.stories);
        return myDB.get(id)
    },
    saveStory(story){
        const myDB = dbConn.use(settings.dbNames.stories);
        return myDB.insert(story);        
    },
    init() {
        return new Promise((resolve, reject) => {
            return dbConn.list().then(
                res => {
                    return Promise.all(
                        Object.values(settings.dbNames)
                            .map(dbName => {
                                if (!res.includes(dbName))
                                    return dbConn.create(dbName)
                            })
                    )
                }
            ).then(
                console.log
            ).then(
                () => resolve()
            )
            // Promise
        })
    }
}

export default db;