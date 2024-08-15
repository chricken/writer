'use strict';

import './components/Content/index.js';
import './components/Modal/index.js';
import './components/ModalLoad/index.js';

import dom from './dom.js';
import ajax from './ajax.js';
import render from './render.js';
import settings from './settings.js';

const init = () => {
    dom.mapping();
    dom.appendEventlisteners();

    /*
    ajax.loadSingleStory('2f1234228c9deac74968b652e500b166').then(
        render.story
    ).catch(
        console.warn
    )
        */
    let elModal = dom.create({
        type: 'custom-modal',
        parent: document.body,
        attr: {
            header: 'Load Story'
        }
    })

    const modalLoad = dom.create({
        type: 'modal-content-load',
        parent: elModal
    })

    modalLoad.addEventListener('selected', evt => {
        console.log('Load this', evt.detail.storyID);

    })
}

// INIT
init();