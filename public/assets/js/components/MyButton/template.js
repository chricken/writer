'use strict';

const template = document.createElement('div');

const parentInput = document.createElement('div');
parentInput.className = 'container';
template.append(parentInput);

const elButton = document.createElement('button');
parentInput.append(elButton);

let path = new URL(import.meta.url).pathname;
path = `${path.substring(0, path.lastIndexOf('/') + 1)}styles.css`;
const elStyle = document.createElement('style');
elStyle.innerHTML = "@import '" + path + "';";
template.append(elStyle);

export default template;