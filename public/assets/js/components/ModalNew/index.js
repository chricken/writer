'use strict';

import template from './template.js';
import ajax from './ajax.js';
import settings from '/assets/js/settings.js';

class ModalNew extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
    }


    connectedCallback() {
        const btnCreate = this.root.querySelector('.btnCreate');
        const inpTitle = this.root.querySelector('.inpTitle');

        btnCreate.addEventListener('click',() => {
            const myEvent = new CustomEvent('create', {
                detail: {
                    title: inpTitle.value,
                    userID: settings.activeUser
                }
            })
    
            this.dispatchEvent(myEvent);
        })
    }
}

customElements.define('modal-content-new', ModalNew);