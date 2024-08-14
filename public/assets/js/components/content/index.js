'use strict';

import template from './template.js';

class Content extends HTMLElement {
 constructor(){
  super();
  this.root = this.attachShadow({ mode: 'closed' });
  this.root.append(template.cloneNode(true));
 }
}

customElements.define('content-edit', Content);