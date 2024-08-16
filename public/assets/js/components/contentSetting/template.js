'use strict';

import settings from '/assets/js/settings.js';

const template = document.createElement('div');
template.className = 'container';

const elStyling = document.createElement('div');
template.append(elStyling);

// Select Styling
const headerStyling = document.createElement('h5');
headerStyling.innerHTML = 'Style: ';
elStyling.append(headerStyling);

// Selectfeld
const selStyling = document.createElement('select');
selStyling.className = 'selStyling';
elStyling.append(selStyling)

// Optionen
Object.entries(settings.styles).forEach(([key, val]) => {
    let opt = document.createElement('option');
    opt.innerHTML = val;
    opt.value = key;
    selStyling.append(opt);
})

// Eingabe der Scene
const headerScene = document.createElement('h5');
headerScene.innerHTML = 'Type of Scene: ';
template.append(headerScene);

const inpScene = document.createElement('input');
inpScene.placeholder = 'Type of Scene';
inpScene.type = 'text';
template.append(inpScene);

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