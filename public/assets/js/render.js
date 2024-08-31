'use strict';

import settings, { elements } from './settings.js';
import Scene from './classes/Abschnitt.js';

const render = {
    addContent(index) {
        settings.story.paragraphs.splice(index, 0, new Scene(settings.story));
        settings.activeElement = index;
        render.story();
    },
    removeContent(index, text) {
        console.log(text.content);
        
        if (confirm(`Soll der markierte Text wirklich entfernt werden?`)) {
            settings.story.paragraphs.splice(index, 1);
            render.story();
        }
    },
    story() {
        const contents = settings.story;
        // console.log('render', contents);
        elements.spalteContents.innerHTML = '';
        let activeParagraph = false;

        contents.paragraphs.forEach((paragraph, index) => {
            // Button zum Erzeugen eines neuen Textabschnittes
            const btnAddContent = document.createElement('add-content');
            elements.spalteContents.append(btnAddContent);

            btnAddContent.addEventListener('add', () => render.addContent(index))

            const elParagraph = document.createElement('content-editable');
            elements.spalteContents.append(elParagraph);
            elParagraph.init({ paragraph, styles: contents.styles });

            elParagraph.addEventListener('changedstyle', () => {
                // console.log('style changed');
                render.story();
            })
            elParagraph.addEventListener('addContent', () => render.addContent(index + 1))

            elParagraph.addEventListener('removeContent', () => render.removeContent(index, paragraph))

            // Dieses Element merken, falls es nach dem Rendern aktiv gemacht werden soll.
            if (index == settings.activeElement) {
                activeParagraph = elParagraph;
            }
        })


        // Einen Add-Button nach allen Abschnitten
        const btnAddContent = document.createElement('add-content');
        elements.spalteContents.append(btnAddContent);
        btnAddContent.addEventListener('add', () => render.addContent(settings.story.paragraphs.length));

        // Falls ein Paragraph aktiv ist, setze den Fokus drauf
        if (activeParagraph) {
            // console.log(activeParagraph);            
            activeParagraph.click();
        }
    }
}

export default render;