'use strict';

const helpers = {
    createNumber(min, max) {
        return ~~(Math.random() * (max - min + 1) + min)
    },
    getNextId(data) {
        let myID = (Math.random() * 1e20).toString(36) + String(Date.now()).substr(-8).toString(36);
        console.log(myID);
        while (data.some(dataset => dataset.id == myID)) {
            myID = (Math.random() * 1e20).toString(36) + String(Date.now()).substr(-8).toString(36);
            console.log('new ID: ', myID);
        }
        return myID
    },
}

export default helpers;