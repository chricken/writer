'use strict';

import template from './template.js';
import settings from '/assets/js/settings.js';
import Person from '/assets/js/classes/Person.js';

// Components
import '/assets/js/components/ListOfStrings/index.js';

class DBPersons extends HTMLElement {
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
        settings.story.db.persons.forEach(person => {
            const containerPerson = document.createElement('div');
            containerPerson.className = 'containerPerson containerDB closed';
            inner.append(containerPerson);

            containerPerson.addEventListener('click', evt => {
                // Soll nicht auf Kind-Elemente reagieren
                if (
                    evt.target == evt.currentTarget
                    || evt.target.classList.contains('closedVisible')
                    || evt.target.classList.contains('info')
                    || evt.target.classList.contains('legend')
                    || evt.target.parentElement == evt.currentTarget
                )
                    containerPerson.classList.toggle('closed')
            })

            // name
            const containerNameOpener = document.createElement('p');
            containerNameOpener.innerHTML = person.name;
            containerNameOpener.className = 'closedVisible';
            containerPerson.append(containerNameOpener);

            // ID
            const containerID = document.createElement('p');
            containerID.innerHTML = person.id;
            containerID.className = 'info';
            containerPerson.append(containerID);

            // Name
            const containerName = document.createElement('p');
            containerPerson.append(containerName);

            const elLegendName = document.createElement('span')
            elLegendName.innerHTML = 'Name: ';
            elLegendName.className = 'legend';
            containerName.append(elLegendName);

            const inputName = document.createElement('input');
            inputName.type = 'text';
            inputName.value = person.name;
            containerName.append(inputName);
            inputName.addEventListener('change', () => {
                person.name = inputName.value;
                // this.dispatchEvent(eventChange);
            });

            // Geburtsjahr
            const containerGeb = document.createElement('p');
            containerPerson.append(containerGeb);

            const elLegendGeb = document.createElement('span')
            elLegendGeb.innerHTML = 'Geboren: ';
            elLegendGeb.clasName = 'legend';
            containerGeb.append(elLegendGeb);

            const inputGeb = document.createElement('input');
            inputGeb.type = 'number';
            inputGeb.value = person.birth;
            containerGeb.append(inputGeb);
            inputGeb.addEventListener('change', () => {
                person.birth = +inputGeb.value;
                // this.dispatchEvent(eventChange);
            });

            // Rasse
            const containerRace = document.createElement('p');
            containerPerson.append(containerRace);

            const elLegendRace = document.createElement('span')
            elLegendRace.innerHTML = 'Rasse: ';
            elLegendRace.clasName = 'legend';
            containerRace.append(elLegendRace);

            const selRace = document.createElement('select');
            containerRace.append(selRace);

            settings.story.db.races.forEach(race => {
                const optionRace = document.createElement('option');
                optionRace.innerHTML = race;
                selRace.append(optionRace);
            })
            selRace.value = person.race;

            selRace.addEventListener('input', () => {
                person.race = selRace.value;
                console.log(person);
            });

            // Beschreibung            
            const containerDesc = document.createElement('p');
            containerPerson.append(containerDesc);

            const elLegendDesc = document.createElement('span')
            elLegendDesc.innerHTML = 'Beschreibung: ';
            elLegendDesc.clasName = 'legend';
            containerDesc.append(elLegendDesc);
            
            const inputDesc = document.createElement('div');
            inputDesc.innerHTML = person.desc;
            inputDesc.setAttribute('contenteditable', 'true');
            containerDesc.append(inputDesc);

            inputDesc.addEventListener('input', evt => {
                person.desc = inputDesc.innerHTML;
                // this.dispatchEvent(eventChange);
            });

            
            // Synonyme
            const containerSynonyms = document.createElement('list-of-strings');
            containerSynonyms.init({
                title: 'Synonyms',
                data: person.synonyms,
                activeIndex:0
            })

            containerPerson.append(containerSynonyms);

            containerSynonyms.addEventListener('changed', evt => {
                evt.stopPropagation();
                containerSynonyms.init({
                    title: 'Synonyms',
                    data: person.synonyms,
                    activeIndex: evt.detail.index,
                })
            })
        })

        // BtnAdd mit Eventlistener aktivieren
        this.elements.btnAdd.addEventListener('click', () => {
            // console.log(Person);
            settings.story.db.persons.push(new Person());
            this.dispatchEvent(eventChange);
        })
    }
}

customElements.define('db-persons', DBPersons);