'use strict';

const ajax = {
    loadList() {
        return fetch('/allStories').then(
            res => res.json()
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