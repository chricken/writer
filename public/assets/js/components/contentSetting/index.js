
'use strict';

import template from './template.js';

class ContentSetting extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
    }

    connectedCallback(){
        this.addEventListener('click', evt => evt.stopPropagation())
    }
}

customElements.define('content-setting', ContentSetting);