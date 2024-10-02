'use strict';

import template from './template.js';

class MyButton extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'closed'
        })
        this.root.append(template.cloneNode(true));
    }

    // Nicht-String-Attribute übergeben
    update({ legend, type }) {
        const elButton = this.root.querySelector('button');

        if (legend) elButton.innerHTML = legend;
        if (type) elButton.type = type;
    }


    // Eventlistener für Mounting
    connectedCallback() {
        const elButton = this.root.querySelector('button');

        elButton.addEventListener('click', () => {
            const myEvent = new CustomEvent('click');
            this.dispatchEvent(myEvent);
        })

    }
}

customElements.define('my-button', MyButton);