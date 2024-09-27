'use strict';

const template = document.createElement('div');
template.className = 'container';

// Header
const elHeader = document.createElement('h4');
elHeader.innerHTML = 'Placetypes: ';
template.append(elHeader);

// inner für Content
const elInner = document.createElement('div');
elInner.className = 'inner';
template.append(elInner);


// Button zum erzeugen eines neuen Objektes
const btnAdd = document.createElement('button');
btnAdd.innerHTML = 'Enter';
btnAdd.className = 'btnAdd';
template.append(btnAdd);

// STYLE
const elStyle = document.createElement('link');
elStyle.rel = 'stylesheet';

// Aktuelle Adresse der JS-Datei auslesen
let localURL = new URL(import.meta.url).pathname;

// Dateiname der JS-Datei durch den Namen der CSS-Datei ersetzen
let indexLastSlash = localURL.lastIndexOf('/');
localURL = localURL.substring(0, indexLastSlash + 1);
localURL += 'styles.css';

// CSS-Datei laden
elStyle.href = localURL;
template.append(elStyle);

export default template;