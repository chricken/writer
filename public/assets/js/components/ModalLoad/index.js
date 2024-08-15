'use strict';

import template from './template.js';
import ajax from './ajax.js';
import render from './render.js';

class ModalLoad extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
    }

    onClick(id){
        console.log(id);
        
    }

    connectedCallback() {
        const elContent = this.root.querySelector('.frame');
        ajax.loadList().then(
            res => render.list(res, elContent, this.onClick)
        ).catch(
            console.warn
        )
    }
}

customElements.define('modal-content-load', ModalLoad);