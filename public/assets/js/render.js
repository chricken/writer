'use strict';

import { elements } from './settings.js';

const render = {
    story(contents) {
        console.log('render', contents);
        elements.spalteContents.innerHTML = '';

        contents.paragraphs.forEach(paragraph => {

            const elParagraph = document.createElement('content-editable');
            elements.spalteContents.append(elParagraph);
            elParagraph.init({ paragraph, styles: contents.styles });

            elParagraph.addEventListener('changed', evt => { })
        })
    }
}

export default render;