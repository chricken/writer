'use strict';

import template from './template.js';

// Components
import '/assets/js/components/ListOfStrings/index.js';

class ListOfStrings extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'closed'
        })
        this.root.append(template.cloneNode(true));

        // Das elements-Objekt muss in der Instanz liegen, sonst teilen alle Instanzen die Elements
        this.elements = {}
        this.domMapping();
    }

    domMapping() {
        this.elements.container = this.root.querySelector('.template')
        this.elements.header = this.root.querySelector('h4')
        this.elements.inner = this.root.querySelector('.inner')
        this.elements.btnAdd = this.root.querySelector('.btnAdd')
    }

    init({ title = '', data = [], activeIndex = 0 } = {}) {
        const addElement = (evt, index) => {
            if (evt) evt.stopPropagation();

            data.splice(index + 1, 0, '');

            const eventChange = new CustomEvent('changed', {
                detail: { index: index + 1 }
            });
            this.dispatchEvent(eventChange);
        }

        // Überschrift
        this.elements.header.innerHTML = title;
        this.elements.inner.innerHTML = '';


        data.forEach((el, index) => {
            const elData = document.createElement('div');
            elData.setAttribute('contenteditable', 'true');
            elData.className = 'data';
            elData.innerHTML = el;
            this.elements.inner.append(elData);

            if (index == activeIndex) elData.focus();

            elData.addEventListener('click', evt => {
                evt.stopPropagation();
            })

            elData.addEventListener('input', () => {
                data[index] = elData.innerHTML;
            })

            elData.addEventListener('keydown', evt => {
                if (evt.ctrlKey && evt.keyCode == 13) {
                    addElement(false, index);
                }
            })

            // Entfernen-Botton
            const btnRemove = document.createElement('button');
            btnRemove.innerHTML = '✖';
            btnRemove.className = 'btnRemoveInInput'
            elData.append(btnRemove);

            btnRemove.addEventListener('click', evt => {
                evt.stopPropagation();
                data.splice(index, 1);

                const eventChange = new CustomEvent('changed', {
                    detail: { index: index }
                });
                this.dispatchEvent(eventChange);
            })
        })

        // Add-Button
        this.elements.btnAdd.addEventListener('click', evt => addElement(evt, data.length));

    }

    // Eventlistener für Mounting
    connectedCallback() {
    }
}

customElements.define('list-of-strings', ListOfStrings);