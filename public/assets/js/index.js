'use strict';

import './components/content/index.js';
import dom from './dom.js';

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
    elements.contents = dom.$$('.content');
    elements.spalteContents=dom.$('#spalteContents');
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

    const newEditable = dom.create({
        type:'content-edit',
        parent: elements.spalteContents
    })

}

// INIT
init();