'use strict';

import template from './template.js';
import ajax from './ajax';

class ModalLoad extends HTMLElement {
    constructor(){
        super();
        this.root = this.attachShadow({mode: 'closed'});
        this.root.append(template.cloneNode(true));
    }

    connectedCallback(){
        ajax.loadList().then(
            render.list
        ).catch(
            console.warn            
        )
    }
}

customElements.define('modal-content-load', ModalLoad);