'use strict';

import settings from './settings.js';
import render from './render.js';
import dom from './dom.js';

// Klassen
import Story from './classes/Story.js';
import Person from './classes/Person.js';
import Group from './classes/Group.js';
import Place from './classes/Place.js';



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
    login() {
        let elModal = dom.create({
            type: 'custom-modal',
            parent: document.body,
            attr: {
                header: 'Login'
            },
        })
        

        dom.create({
            type: 'modal-login',
            parent: elModal,
            listeners: {
                send(evt) {
                    console.log(evt.detail);
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
                    ).then(
                        render.db
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
        ).then(
            () => {
                let db = settings.story.db;
                db.persons = db.persons.map(person => new Person(person))
                db.groups = db.groups.map(group => new Group(group))
                db.places = db.places.map(place => new Place(place))
                // console.log(db);
            }
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