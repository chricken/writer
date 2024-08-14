'use strict';

import './components/content/index.js';
import dom from './dom.js';
import ajax from './ajax.js';
import render from './render.js';
import settings from './settings.js';

const init = () => {
    dom.mapping();
    dom.appendEventlisteners();

    ajax.loadSingleStory('2f1234228c9deac74968b652e500b166').then(
        render.story
    ).catch(
        console.warn
    )

}

// INIT
init();