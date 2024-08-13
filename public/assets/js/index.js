'use strict';

import dom from './dom.js'

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
    elements.contents = dom.$$('.content');
}

const handleInput = evt =>{
    console.log(evt.target.innerText);
    
}

const appendEventlisteners = () => {
    elements.contents.forEach(content => {
        content.addEventListener('input', handleInput)
    })
}

const init = () => {
    domMapping();
    appendEventlisteners();
}

// INIT
init();