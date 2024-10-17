'use strict';


const ajax = {
    loadList(userID) {
        return fetch('/allStories',{
            method: 'post',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify({
                userID
            })
        }).then(
            res => res.json()
        ).then(
            res => {
                console.log('return from Server', res);
                return res;
            }
        )
    },
    deleteStory(story) {
        return fetch('/deleteStory', {
            method: 'delete',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(story)
        }).then(
            res => res.json()
        )
    }
}

export default ajax;