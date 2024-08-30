'use strict';

import settings, { elements } from './settings.js';
import Scene from './classes/Abschnitt.js';

const render = {
    story() {
        const contents = settings.story;
        // console.log('render', contents);
        elements.spalteContents.innerHTML = '';
        let activeParagraph = false;

        contents.paragraphs.forEach((paragraph, index) => {
            // Button zum Erzeugen eines neuen Textabschnittes
            const btnAddContent = document.createElement('add-content');
            elements.spalteContents.append(btnAddContent);
        
            btnAddContent.addEventListener('add', () => {
                settings.story.paragraphs.splice(index, 0, new Scene(settings.story));
                settings.activeElement = index;
                render.story();
            })

            const elParagraph = document.createElement('content-editable');
            elements.spalteContents.append(elParagraph);
            elParagraph.init({ paragraph, styles: contents.styles });

            elParagraph.addEventListener('changedstyle', () => {
                console.log('style changed');
                render.story();
            })

            // Dieses Element merken, falls es nach dem Rendern aktiv gemacht werden soll.
            if (index == settings.activeElement) {
                activeParagraph = elParagraph;
            }
        })


        // Einen Add-Button nach allen Abschnitten
        const btnAddContent = document.createElement('add-content');
        elements.spalteContents.append(btnAddContent);
        btnAddContent.addEventListener('add', () => {
            settings.activeElement = settings.story.paragraphs.length;
            settings.story.paragraphs.splice(settings.story.paragraphs.length, 0, new Scene(settings.story));
            render.story();
        })

        // Falls ein Paragraph aktiv ist, setze den Fokus drauf
        if(activeParagraph){
            // console.log(activeParagraph);            
            activeParagraph.click();
        }
    }
}

export default render;