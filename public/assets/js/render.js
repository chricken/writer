'use strict';

import settings, { elements } from './settings.js';
import Scene from './classes/Abschnitt.js';

const render = {
    story() {
        const contents = settings.story;
        // console.log('render', contents);
        elements.spalteContents.innerHTML = '';

        contents.paragraphs.forEach((paragraph, index) => {
            const btnAddContent = document.createElement('add-content');
            elements.spalteContents.append(btnAddContent);

            btnAddContent.addEventListener('add', () => {
                settings.story.paragraphs.splice(index, 0, new Scene(settings.story));
                render.story();
            })

            const elParagraph = document.createElement('content-editable');
            elements.spalteContents.append(elParagraph);
            elParagraph.init({ paragraph, styles: contents.styles });
        })


        // Einen Add-Button nach allen Abschnitten
        const btnAddContent = document.createElement('add-content');
        elements.spalteContents.append(btnAddContent);
        btnAddContent.addEventListener('add', () => {
            settings.story.paragraphs.splice(settings.story.paragraphs.length, 0, new Scene(settings.story));
            render.story();
        })
    }
}

export default render;