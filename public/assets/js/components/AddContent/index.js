'use strict';

import template from './template.js';

class AddContent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'closed'
        })
        this.root.append(template.cloneNode(true));
    }

    addContent() {
        const myEvent = new CustomEvent('add');

        this.dispatchEvent(myEvent);
    }

    // Eventlistener für Mounting
    connectedCallback() {
        const container = document.querySelector('.container');
        container.addEventListener('click', this.addContent)
    }
}

customElements.define('add-content', AddContent);