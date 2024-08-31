'use strict';

import '/assets/js/components/ContentSetting/index.js';
import template from './template.js';


class Content extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));

        // Das Objekt muss in der Instanmz liegen, sonst teilen alle Instanzen die Elements
        this.elements = {}
        this.domMapping();
    }

    domMapping() {
        this.elements.text = this.root.querySelector('.text')
        this.elements.settings = this.root.querySelector('content-setting')
    }

    onChangedStyle() {
        const myEvent = new CustomEvent('changedstyle')
        this.dispatchEvent(myEvent);
    }

    onRemoveContent() {
        const myEvent = new CustomEvent('removeContent')
        this.dispatchEvent(myEvent);
    }

    updateStyle(styles) {
        const elStyle = this.root.querySelector('style.customStyles');
        elStyle.innerHTML = '';

        Object.entries(styles).forEach(([key, val]) => {
            elStyle.innerHTML += `.${key} {${val}}`;
        })

    }

    init({ paragraph = {}, styles = {} }) {
        // Eigener Event zum dispatchen, wenn es eine Änderung gegeben hat
        const eventChange = new CustomEvent('changed', {
            detail: { paragraph }
        })
        const eventAddContent = new CustomEvent('addContent');

        this.elements.text.innerHTML = paragraph.content;
        // console.log(paragraph, styles);

        // Eingetragene Daten in Objekt übertragen.
        // Da die Daten als Objekt übergeben wurden, dürfte die Änderung auch im Root zu sehen sein
        this.elements.text.addEventListener('input', evt => {
            paragraph.content = this.elements.text.innerHTML;
            this.dispatchEvent(eventChange);
        })

        // Auf eine Strg-Enter reagieren
        this.elements.text.addEventListener('keydown', evt => {
            if (evt.ctrlKey && evt.keyCode == 13) {
                this.dispatchEvent(eventAddContent);
            }
        })

        // Klasse vergeben
        this.elements.text.classList.add(paragraph.style);

        // Klasse in CSS eintragen, die per Parameter übergeben wurde
        const elStyle = document.createElement('style');
        elStyle.className = 'customStyles';
        this.root.append(elStyle);
        elStyle.innerHTML = '';

        // CSS-Styles übertragen
        // Das hier kann ich vielleicht besser mit einem gobalen Style machen, der hier importiert wird? 
        // Aber ich gleube, hier kann ich nur Dateien einfügen. Deswegen lasse ich es erstemal so.
        Object.entries(styles).forEach(([key, val]) => {
            elStyle.innerHTML += `.${key} {${val}}`;
        })

        // Wenn das Element angeklickt wird, den Textblock auswählen
        this.addEventListener('click', evt => {
            evt.stopPropagation();
            this.elements.text.focus();
        })

        // Focus soll nicht entfernt werden, wenn das setting angeklickt wird
        this.elements.settings.addEventListener('click', evt => {
            evt.stopPropagation();
            // this.elements.text.focus();
        })

        // Parameter an settings übergeben
        this.elements.settings.init({
            style: paragraph.style
        })

        // Wenn sich das Styling in den Settings ändert
        this.elements.settings.addEventListener('selectedstyle', evt => {
            paragraph.style = evt.detail.newStyle;
            this.onChangedStyle();
        })

        // Wenn der Paragraph entfernt werden soll
        this.elements.settings.addEventListener('removeContent', evt => {
            this.onRemoveContent();
        })

    }
}

customElements.define('content-editable', Content);