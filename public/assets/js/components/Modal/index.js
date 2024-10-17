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

    update({ doNotClose = false } = {}) {
        console.log('update');

        if (doNotClose) {
            this.doNotClose = true;
            const elBG = this.root.querySelector('.bg');
            console.log(elBG);
            
            elBG.removeEventListener('click', this.closeModal.bind(this));
        }

    }

    attributeChangedCallback(attrName, oldVal, currentVal) {
        if (attrName == 'header') {
            const elHeader = this.root.querySelector('h2');
            elHeader.innerHTML = currentVal;
        }
    }
    closeModal(evt) {
        // console.log(evt.target);
        evt.stopPropagation();
        this.remove();
    }

    connectedCallback() {
        // Eventlistener
        const elBG = this.root.querySelector('.bg');
        const elFrame = this.root.querySelector('.frame');
        const elBtnClose = this.root.querySelector('.btnClose');
        console.log('connected');

        if (!this.doNotClose) elBG.addEventListener('click', this.closeModal.bind(this));
        elBtnClose.addEventListener('click', this.closeModal.bind(this));
        elFrame.addEventListener('click', evt => evt.stopPropagation());

    }
}

customElements.define('custom-modal', Modal);