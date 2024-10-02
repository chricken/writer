'use strict';

const template = document.createElement('div');

const parentInput = document.createElement('div');
parentInput.className = 'container';
template.append(parentInput);

const legendInput = document.createElement('span');
legendInput.innerHTML='Legend';
legendInput.className = 'legend';
parentInput.append(legendInput);

const elInput = document.createElement('input');
elInput.type = 'text';
parentInput.append(elInput)

let path = new URL(import.meta.url).pathname;
path = `${path.substring(0, path.lastIndexOf('/') + 1)}styles.css`;
const elStyle = document.createElement('style');
elStyle.innerHTML = "@import '" + path + "';";
template.append(elStyle);

export default template;