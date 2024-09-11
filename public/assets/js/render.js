'use strict';

// Components
import '/assets/js/components/DBPersons/index.js';
import '/assets/js/components/DBPlaces/index.js';

import settings, { elements } from './settings.js';
import Scene from './classes/Abschnitt.js';
import dom from './dom.js';

const render = {
    addContent(index) {
        settings.story.paragraphs.splice(index, 0, new Scene(settings.story));
        settings.activeElement = index;
        render.story();
    },

    removeContent(index, text) {
        // console.log(text.content);

        if (confirm(`Soll der markierte Text wirklich entfernt werden?`)) {
            settings.story.paragraphs.splice(index, 1);
            render.story();
        }
    },

    story() {
        // Container für alle Absätze leeren/initialisieren
        elements.paragraphs = [];

        const contents = settings.story;
        elements.spalteContents.innerHTML = '';
        elements.spalteTypes.innerHTML = '';
        let activeParagraph = false;

        contents.paragraphs.forEach((paragraph, index) => {

            // Button zum Erzeugen eines neuen Textabschnittes
            const btnAddContent = document.createElement('add-content');
            elements.spalteContents.append(btnAddContent);

            btnAddContent.addEventListener('add', () => render.addContent(index))

            const elParagraph = document.createElement('content-editable');
            elements.paragraphs.push(elParagraph);
            elements.spalteContents.append(elParagraph);
            elParagraph.init({ paragraph, styles: contents.styles });

            // elParagraph.addEventListener('changedstyle', () => render.story());
            elParagraph.addEventListener('changed', () => {
                settings.activeElement = index;
                render.story()
            });
            elParagraph.addEventListener('addContent', () => render.addContent(index + 1));
            elParagraph.addEventListener('removeContent', () => render.removeContent(index, paragraph));

            // Wenn der Paraghraph ausgewählt wird, markiere auch den dazugehörigen Punkt in der Übersicht
            elParagraph.addEventListener('focus', evt => {
                [...elements.spalteTypes.children].forEach(child => child.classList.remove('highlight'));
                elements.spalteTypes.children[index].classList.add('highlight');
            })

            // Dieses Element merken, falls es nach dem Rendern aktiv gemacht werden soll.
            if (index == settings.activeElement) {
                activeParagraph = elParagraph;
            }

            // Eintrag in die Liste der Typen, um eine Übersicht über die Geschichte zu erhalten
            const elType = dom.create({
                type: 'section-type',
                parent: elements.spalteTypes,
                listeners: {
                    click() {
                        elParagraph.click()
                    }
                }
            });

            elType.init({
                content: paragraph.type,
                bgColor: paragraph.bgColor,
                textColor: paragraph.textColor,
            })

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

    },

    formats() {
        elements.formats.innerHTML = '';

        Object.entries(settings.styles).forEach(([style, legend]) => {
            // console.log(style, legend);
            dom.create({
                type: 'h4',
                content: legend,
                parent: elements.formats
            })

            const taStyle = dom.create({
                type: 'textarea',
                parent: elements.formats,
                cssClassName: 'wide',
                content: settings.story.styles[style] || '',
                listeners: {
                    input(evt) {
                        settings.story.styles[style] = evt.target.value;
                        elements.paragraphs.forEach(paragraph => {
                            paragraph.updateStyle(settings.story.styles);
                        })
                    }
                }
            })
        })
    },

    db() {
        elements.db.innerHTML = '';

        // Persons
        const containerPersons = dom.create({
            type: 'db-persons',
            parent: elements.db,
        })

        containerPersons.addEventListener('changed', render.db);

        // Places
        const containerPlaces = dom.create({
            type: 'db-places',
            parent: elements.db,
        })

        containerPlaces.addEventListener('changed', render.db);

        // Groups

        // Races

        // Placetypes
    },
}

export default render;