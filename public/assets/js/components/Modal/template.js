'use strict';

// template.js

const template = document.createElement('div');
template.className = 'bg';

const elFrame = document.createElement('div');
elFrame.className = 'frame'
template.append(elFrame);

const elHeader = document.createElement('h2');
elFrame.append(elHeader);

const elContent = document.createElement('div');
elContent.className = 'content';
elFrame.append(elContent);

const elSlot = document.createElement('slot');
elContent.append(elSlot);

const elBtnClose = document.createElement('div');
elBtnClose.className = 'btn btnClose';
elBtnClose.innerHTML = '✖';
elFrame.append(elBtnClose);

// STYLE
const elStyle = document.createElement('link');
elStyle.rel = 'stylesheet';

// Aktuelle Adresse der JSDatei auslesen
let localURL = new URL(import.meta.url).pathname;

// Dateiname der JS-Datei durch den Namen der CSS-Datei ersetzen
let indexLastSlash = localURL.lastIndexOf('/');
localURL = localURL.substring(0, indexLastSlash + 1);
localURL += 'styles.css';

// CSS-Datei laden
elStyle.href = localURL;
template.append(elStyle);

export default template;