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

   ajax.loadStorySelection();

}

// INIT
init();