'use strict';

import template from './template.js';

class ModalLogin extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
    }
    update({ msg = false } = {}) {
        if (msg) {
            let elMsg = this.root.querySelector('.msg');
            elMsg.innerHTML = msg;

            setTimeout(
                () => elMsg.innerHTML = '',
                5000
            )
        }
    }

    onClick(id) {
        console.log(id);
        const myEvent = new CustomEvent('selected', {
            detail: {
            }
        })

        this.dispatchEvent(myEvent);
    }

    connectedCallback() {
        let userdata = {
            username: '',
            password: ''
        }

        const inpUser = this.root.querySelector('.inpUser');
        inpUser.update({
            legend: 'Username',
            type: 'text',
            value: ''
        });
        inpUser.addEventListener('change', evt => {
            userdata.username = evt.detail.value;
        })

        const inpPassword = this.root.querySelector('.inpPassword');
        inpPassword.update({
            legend: 'Passwort',
            type: 'password',
            value:''
        });
        inpPassword.addEventListener('change', evt => {
            userdata.password = evt.detail.value;
        })

        const btnSend = this.root.querySelector('.btnSend');
        btnSend.update({
            legend: 'Absenden',
            type: 'button'
        });
        btnSend.addEventListener('pressed', evt => {
            // console.log('clicks', userdata);

            const myEvent = new CustomEvent('send', {
                detail: userdata
            });

            this.dispatchEvent(myEvent);
        })

    }
}

customElements.define('modal-login', ModalLogin);