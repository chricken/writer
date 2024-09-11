'use strict';

import template from './template.js';
import settings from '/assets/js/settings.js';
import Place from '/assets/js/classes/Place.js';

// Components
import '/assets/js/components/ListOfStrings/index.js';

class DBPlaces extends HTMLElement {
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
        settings.story.db.places.forEach(place => {
            const containerPlace = document.createElement('div');
            containerPlace.className = 'containerPlace containerDB closed';
            inner.append(containerPlace);

            containerPlace.addEventListener('click', evt => {
                // Soll nicht auf Kind-Elemente reagieren
                if (
                    evt.target == evt.currentTarget
                    || evt.target.classList.contains('closedVisible')
                    || evt.target.classList.contains('info')
                    || evt.target.classList.contains('legend')
                    || evt.target.parentElement == evt.currentTarget
                )
                    containerPlace.classList.toggle('closed')
            })


            // Name
            const containerNameOpener = document.createElement('p');
            containerNameOpener.innerHTML = place.name;
            containerNameOpener.className = 'closedVisible';
            containerPlace.append(containerNameOpener);

            // ID
            const containerID = document.createElement('p');
            containerID.innerHTML = place.id;
            containerID.className = 'info';
            containerPlace.append(containerID);

            // Name Input
            const containerName = document.createElement('p');
            containerPlace.append(containerName);

            const elLegendName = document.createElement('span')
            elLegendName.innerHTML = 'Name: ';
            elLegendName.className = 'legend';
            containerName.append(elLegendName);

            const inputName = document.createElement('input');
            inputName.type = 'text';
            inputName.value = place.name;
            containerName.append(inputName);
            inputName.addEventListener('change', () => {
                place.name = inputName.value;
                // this.dispatchEvent(eventChange);
            });

            // id = false, name = '', type = '', synonyms = [], desc = ''
            // Rasse
            const containerType = document.createElement('p');
            containerPlace.append(containerType);

            const elLegendType = document.createElement('span');
            elLegendType.innerHTML = 'Umgebung: ';
            elLegendType.className = 'legend';
            containerType.append(elLegendType);

            const selType = document.createElement('select');
            containerType.append(selType);

            settings.story.db.placetypes.forEach(type => {
                const optionType = document.createElement('option');
                optionType.innerHTML = type;
                selType.append(optionType);
            })
            selType.value = place.type;

            selType.addEventListener('input', () => {
                place.type = selType.value;
                console.log(place);
            });

            // Beschreibung            
            const containerDesc = document.createElement('p');
            containerPlace.append(containerDesc);

            const elLegendDesc = document.createElement('span')
            elLegendDesc.innerHTML = 'Beschreibung: ';
            elLegendDesc.className = 'legend';
            containerDesc.append(elLegendDesc);

            const inputDesc = document.createElement('div');
            inputDesc.innerHTML = place.desc;
            inputDesc.setAttribute('contenteditable', 'true');
            containerDesc.append(inputDesc);

            inputDesc.addEventListener('input', evt => {
                place.desc = inputDesc.innerHTML;
                // this.dispatchEvent(eventChange);
            });

            // Synonyme
            const containerSynonyms = document.createElement('list-of-strings');
            containerSynonyms.init({
                title: 'Synonyms',
                data: place.synonyms,
                activeIndex:0
            })

            containerPlace.append(containerSynonyms);

            containerSynonyms.addEventListener('changed', evt => {
                evt.stopPropagation();
                containerSynonyms.init({
                    title: 'Synonyms',
                    data: place.synonyms,
                    activeIndex: evt.detail.index,
                })
            })

        })

        // BtnAdd mit Eventlistener aktivieren
        this.elements.btnAdd.addEventListener('click', (evt) => {
            evt.stopPropagation()
            settings.story.db.persons.push(new Place());
            this.dispatchEvent(eventChange);
        })
    }
}

customElements.define('db-places', DBPlaces);