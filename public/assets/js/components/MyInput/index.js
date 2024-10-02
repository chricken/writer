'use strict';

import template from './template.js';

class MyInput extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'closed'
        })
        this.root.append(template.cloneNode(true));
    }

    // Nicht-String-Attribute übergeben
    update({ legend, value, type }) {
        const elInput = this.root.querySelector('input');
        const elLegend = this.root.querySelector('.legend');

        if (value) elInput.value = value;
        if (legend) elLegend.innerHTML = legend + ': ';
        if (type) elInput.type = type;
    }


    // Eventlistener für Mounting
    connectedCallback() {
        const elInput = this.root.querySelector('input');
        const elLegend = this.root.querySelector('.legende');

        elInput.addEventListener('change', () => {
            const myEvent = new CustomEvent('change', {detail:{value: elInput.value}});
            this.dispatchEvent(myEvent);
        })

    }
}

customElements.define('my-input', MyInput);