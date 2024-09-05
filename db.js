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
    saveStory(story) {
        const myDB = dbConn.use(settings.dbNames.stories);
        return myDB.insert(story);
    },
    loadAllStories() {
        const myDB = dbConn.use(settings.dbNames.stories);
        return myDB.view('dd', 'viewAll').then(
            res => res.rows.map(row => row.value)
        )
    },
    deleteStory(id) {
        // console.log('db', id);
        // Die Story soll nicht wirklich gelöscht werden, sondern nur als "gelöscht" markiert werden, um sie dann ggf. doch noch wiederherstellen zu können
        // Dazu muss zunächst der Datensatz vollständig geladen und dann mit dem deleted-Marker neu gespeichert werden
        const myDB = dbConn.use(settings.dbNames.stories);

        return myDB.get(id).then(
            res => {
                res.deleted = true;
                return res;
            }
        ).then(
            res => myDB.insert(res)

        )

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