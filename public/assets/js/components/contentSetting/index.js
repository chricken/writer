
'use strict';

import template from './template.js';

class ContentSetting extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
        this.elements = {
            selStyling: this.root.querySelector('.selStyling'),
        }
        // console.log(this.elements);
    }

    init({
        style=''
    }){
        // Selectbox auf den aktuellen style setzen
        this.elements.selStyling.value = style;
        this.elements.selStyling.addEventListener('change', this.handleChangeStyling.bind(this))
    }

    handleChangeStyling(evt){
        console.log(evt);
        
        const myEvent = new CustomEvent('selectedStyle', {
            detail: {
                newStyle: this.elements.selStyling.value
            }
        })

        this.dispatchEvent(myEvent);
    }

    connectedCallback(){
        this.addEventListener('click', evt => evt.stopPropagation());
    }
}

customElements.define('content-setting', ContentSetting);