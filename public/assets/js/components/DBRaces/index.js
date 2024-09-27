'use strict';

import template from './template.js';
import settings from '/assets/js/settings.js';
// import Place from '/assets/js/classes/Place.js';

// Components
import '/assets/js/components/ListOfStrings/index.js';

class DBRaces extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));

        // Das elements-Objekt muss in der Instanz liegen, sonst teilen alle Instanzen die Elements
        this.elements = {}
        this.domMapping();
    }

    domMapping() {
        this.elements.container = this.root.querySelector('.template')
        this.elements.inner = this.root.querySelector('.inner')
        this.elements.btnAdd = this.root.querySelector('.btnAdd')
    }

    connectedCallback() {
        // Eigener Event zum dispatchen, wenn es eine Änderung gegeben hat
        const eventChange = new CustomEvent('changed')

        let inner = this.elements.inner;

        // Anzeige mit den Daten aufbauen
        const containerRace = document.createElement('div');
        containerRace.className = 'containerRace containerDB';
        inner.append(containerRace);

        const inpRaces = document.createElement('input');
        inpRaces.type = 'text';
        containerRace.append(inpRaces);

        inpRaces.value = settings.story.db.races.join(',');

        // BtnAdd mit Eventlistener aktivieren
        this.elements.btnAdd.addEventListener('click', (evt) => {
            evt.stopPropagation()
            inpRaces.value.replaceAll('  ', ' ');
            inpRaces.value.replaceAll(', ', ',');
            // inpRaces.value.replaceAll(' ', ',');
            inpRaces.value.replaceAll('.', ',');
            settings.story.db.races = inpRaces.value.split(',');
            this.dispatchEvent(eventChange);
        })

    }
}

customElements.define('db-races', DBRaces);