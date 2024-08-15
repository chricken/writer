'use strict';

import template from './template.js';

class Modal extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
    }

    // Erwartete String-Attribute
    static get observedAttributes() {
        return ['header']
    }

    attributeChangedCallback(attrName, oldVal, currentVal) {
        if (attrName == 'header') {
            const elHeader = this.root.querySelector('h2');
            elHeader.innerHTML = currentVal;
        }
    }

    connectedCallback() {
        // Eventlistener
        const elBG = this.root.querySelector('.bg');
        const elFrame = this.root.querySelector('.frame');
        const elBtnClose = this.root.querySelector('.btnClose');

        const closeModal = evt => {
            console.log(evt.target);

            evt.stopPropagation();
            this.remove();
        }

        elBG.addEventListener('click', closeModal);
        elBtnClose.addEventListener('click', closeModal);
        elFrame.addEventListener('click', evt => evt.stopPropagation());

    }
}

customElements.define('custom-modal', Modal);