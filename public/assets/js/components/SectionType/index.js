'use strict';

import template from './template.js';

class SectionType extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
    }

    init({
        content = false,
        bgColor = false,
        textColor = false,
    }) {
        const elContent = this.root.querySelector('.content');
        const elContainer = this.root.querySelector('.container');
        if (content)
            elContent.innerHTML = content;
        if (bgColor)
            elContainer.style.backgroundColor = bgColor;
        if (textColor)
            elContent.style.color = textColor;


        // Eventlistener
    }

}

customElements.define('section-type', SectionType);