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


    // Eventlistener für Mounting
    connectedCallback() {
        const container = this.root.querySelector('.container');
        container.addEventListener('click', () => {
            const myEvent = new CustomEvent('add');
            this.dispatchEvent(myEvent);
        })
    }
}

customElements.define('add-content', AddContent);