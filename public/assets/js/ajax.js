'use strict';

import settings from './settings.js';
import render from './render.js';
import dom from './dom.js';

const ajax = {
    newStory() {

        let elModal = dom.create({
            type: 'custom-modal',
            parent: document.body,
            attr: {
                header: 'Create New Story'
            }
        })

        dom.create({
            type: 'modal-content-new',
            parent: elModal,
            listeners: {}
        })

    },

    loadStorySelection() {

        let elModal = dom.create({
            type: 'custom-modal',
            parent: document.body,
            attr: {
                header: 'Load Story'
            }
        })

        dom.create({
            type: 'modal-content-load',
            parent: elModal,
            listeners: {
                selected(evt) {
                    // Modal entfernen
                    elModal.remove();

                    // Story laden
                    ajax.loadSingleStory(evt.detail.storyID).then(
                        render.story
                    ).catch(
                        console.warn
                    )
                }
            }
        })
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