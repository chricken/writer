
'use strict';

import template from './template.js';

class ContentSetting extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.root.append(template.cloneNode(true));
        this.elements = {
            selStyling: this.root.querySelector('.selStyling'),
            inpType: this.root.querySelector('.inpType'),
            btnRemove: this.root.querySelector('.btnRemoveParagraph'),
            inpColorType: this.root.querySelector('.inpColorType'),
            inpColorText: this.root.querySelector('.inpColorText'),
        }
        // console.log(this.elements);
    }

    init(paragraph) {
        // Selectbox auf den aktuellen style setzen
        if (paragraph.style) this.elements.selStyling.value = paragraph.style;
        if (paragraph.type) this.elements.inpType.value = paragraph.type;
        if (paragraph.bgColor) this.elements.inpColorType.value = paragraph.bgColor;
        if (paragraph.textColor) this.elements.inpColorText.value = paragraph.textColor;
        this.elements.selStyling.addEventListener('change', this.handleChangeStyling.bind(this));
        this.elements.btnRemove.addEventListener('click', this.handleRemoveContent.bind(this));
        this.elements.inpType.addEventListener('change', this.handleInputType.bind(this));
        this.elements.inpColorType.addEventListener('change', this.handleChangeColor.bind(this));
        this.elements.inpColorText.addEventListener('change', this.handleChangeColor.bind(this));
    }

    handleInputType() {
        const myEvent = new CustomEvent('inputType', {
            detail: {
                type: this.elements.inpType.value
            }
        });
        this.dispatchEvent(myEvent);
    }

    handleChangeColor() {
        const myEvent = new CustomEvent('inputColor', {
            detail: {
                bgColor: this.elements.inpColorType.value,
                textColor: this.elements.inpColorText.value
            }
        });
        this.dispatchEvent(myEvent);
    }

    handleRemoveContent() {
        const myEvent = new CustomEvent('removeContent');
        this.dispatchEvent(myEvent);
    }

    handleChangeStyling(evt) {
        // console.log(evt);
        const myEvent = new CustomEvent('selectedstyle', {
            detail: {
                newStyle: this.elements.selStyling.value
            }
        })

        this.dispatchEvent(myEvent);
    }

    connectedCallback() {
        this.addEventListener('click', evt => evt.stopPropagation());
    }
}

customElements.define('content-setting', ContentSetting);