'use strict';

import settings from './settings.js';
import render from './render.js';

const ajax = {
    loadListOfStories() {

    },
    loadSingleStory(id) {
        return fetch(`/story?id=${id}`).then(
            res => res.json()
        ).then(
            res => settings.story = res
        )
    },
    saveSingleStory() {
        console.log('save', settings.story);

        return fetch('/story', {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(settings.story)
        }).then(
            res => res.json()
        ).then(
            // res => settings.story = res
        // ).then(
            res => ajax.loadSingleStory(res.id)
        ).then(
            render.story
        )
    }
}

export default ajax;