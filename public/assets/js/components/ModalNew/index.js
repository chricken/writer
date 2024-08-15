'use strict';

import template from './template.js';
import ajax from './ajax.js';

class ModalNew extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
    }


    connectedCallback() {
        
    }
}

customElements.define('modal-content-new', ModalNew);