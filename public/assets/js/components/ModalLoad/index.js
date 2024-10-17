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

    onClick(id) {
        // console.log(id);
        const myEvent = new CustomEvent('selected', {
            detail: {
                storyID: id
            }
        })

        this.dispatchEvent(myEvent);
    }
    update({
        userID = false
    } = {}) {
        if (userID) {
            // Tu etwas mit dem Value
            console.log('UserID', userID);
            const elContent = this.root.querySelector('.frame');
            ajax.loadList(userID).then(
                res => render.list.bind(this)(
                    res,
                    elContent,
                    this.onClick.bind(this),
                    this.onNew.bind(this)
                )
            ).catch(
                console.warn
            )
        }
    }

    /*
    // Erwartete String-Attribute
    static get observedAttributes() {
        return ['userID']
    }

    // Getter und Setter für String-Attribute
    get userID() {
        return this.getAttribute('userID')
    }

    set userID(val) {
        this.setAttribute('userID', val);
    }
        */

    onNew() {
        // console.log(id);
        const myEvent = new CustomEvent('createnew', {})

        this.dispatchEvent(myEvent);
        console.log(this);
    }

    connectedCallback() {

    }

    // Eventlistener für veränderte Attribute
    attributeChangedCallback(attrName, oldVal, currentVal) {
        console.log('changed', attrName);
        /*
        if (attrName == 'userID') {
            // Tu etwas mit dem Value
            console.log('UserID', currentVal);
            const elContent = this.root.querySelector('.frame');
            ajax.loadList(currentVal).then(
                res => render.list.bind(this)(res, elContent, this.onClick.bind(this), this.onNew.bind(this))
            ).catch(
                console.warn
            )
        }
        */
    }
}

customElements.define('modal-content-load', ModalLoad);