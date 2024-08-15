'use strict';

// template.js

const template = document.createElement('div');
template.className = 'container';

// Frame
const elFrame = document.createElement('div');
elFrame.className = 'frame';
template.append(elFrame);

const parentTitle = document.createElement('p');
elFrame.append(parentTitle);

const legendTitle = document.createElement('span');
legendTitle.innerHTML = 'Titel: ';
parentTitle.append(legendTitle);

const inpTitle = document.createElement('input');
inpTitle.placeholder = 'Titel';
parentTitle.append(inpTitle);

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