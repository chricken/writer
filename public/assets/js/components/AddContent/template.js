'use strict';

const template = document.createElement('div');
template.className = 'container';

const elCross = document.createElement('div');
elCross.innerHTML = '✖';
elCross.className = 'btnAddContent';
template.append(elCross);

// STYLE
const elStyle = document.createElement('link');
elStyle.rel = 'stylesheet';

// Aktuelle Adresse der JSDatei auslesen
let localURL =  new URL(import.meta.url).pathname;

// Dateiname der JS-Datei durch den Namen der CSS-Datei ersetzen
let indexLastSlash = localURL.lastIndexOf('/');
localURL = localURL.substring(0, indexLastSlash + 1);
localURL += 'styles.css';

// CSS-Datei laden
elStyle.href = localURL;
template.append(elStyle);

export default template;