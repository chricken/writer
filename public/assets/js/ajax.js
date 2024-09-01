'use strict';

import settings from './settings.js';
import render from './render.js';
import dom from './dom.js';
import Story from './classes/Story.js';

const ajax = {
    newStorySelection() {

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
            listeners: {
                create(evt) {
                    elModal.remove();
                    ajax.createNewStory(evt.detail);
                }
            }
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
                    ).then(
                        render.formats
                    ).catch(
                        console.warn
                    )
                },
                createnew() {
                    elModal.remove();

                    // Neue Story erzeugen
                    ajax.newStorySelection();
                }
            }
        })
    },

    createNewStory(data) {
        // console.log(data);
        const payload = new Story({
            title: data.title
        })
        // console.log(payload);
        settings.story = payload;
        ajax.saveSingleStory();
    },

    loadSingleStory(id) {
        return fetch(`/story?id=${id}`).then(
            res => res.json()
        ).then(
            res => settings.story = res
        )
    },

    saveSingleStory() {
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