'use strict';

import './components/Content/index.js';
import './components/AddContent/index.js';
import './components/Modal/index.js';
import './components/ModalLoad/index.js';
import './components/ModalLogin/index.js';
import './components/ModalNew/index.js';
import './components/MyInput/index.js';
import './components/MyButton/index.js';
import './components/SectionType/index.js';

import dom from './dom.js';
import ajax from './ajax.js';

const init = () => {
    dom.mapping();
    dom.appendEventlisteners();
    
   ajax.login();
//    ajax.loadStorySelection();

}

// INIT
init();