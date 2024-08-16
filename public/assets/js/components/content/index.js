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

    init({ paragraph = {}, styles = {} }) {
        // Eigener Event zum dispatchen, wenn es eine Änderung gegeben hat
        const eventChange = new CustomEvent('changed', {
            detail: { paragraph }
        })
        this.elements.text.innerHTML = paragraph.content;
        // console.log(paragraph);

        // Eingetragene Daten in Objekt übertragen.
        // Da die Daten als Objekt übergeben wurden, dürfte die Änderung auch im Root zu sehen sein
        this.elements.text.addEventListener('input', () => {
            paragraph.content = this.elements.text.innerHTML;
            this.dispatchEvent(eventChange);
        })

        // Klasse vergeben
        this.elements.text.classList.add(paragraph.style);

        // Klasse in CSS eintragen
        const elStyle = document.createElement('style');
        this.root.append(elStyle);
        elStyle.innerHTML = '';

        // Das hier kann ich vielleicht besser mit einem gobalen Style machen, der hier importiert wird? 
        // Aber ich gleube, hier kann ich nur Dateien einfügen. Deswegen lasse ich es erstemal so.
        Object.entries(styles).forEach(([ key, val ]) => {
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

    }
}

customElements.define('content-editable', Content);