'use strict';

const template = document.createElement('div');
template.className = 'container';

const elStyling = document.createElement('div');
template.append(elStyling);

const headerStyling = document.createElement('h4');
headerStyling.innerHTML = 'Style: ';
elStyling.append( headerStyling);

// Selectfeld
const selStyling = document.createElement('select');
elStyling.append(selStyling)

// Optionen
let opt = document.createElement('option');
opt.innerHTML = 'Fließtext';
opt.value = 'p';
selStyling.append(opt);

opt = document.createElement('option');
opt.innerHTML = 'Hervorhebung';
opt.value = 'b';
selStyling.append(opt);

opt = document.createElement('option');
opt.innerHTML = 'Zitat';
opt.value = 'citation';
selStyling.append(opt);

opt = document.createElement('option');
opt.innerHTML = 'Absatz-Header';
opt.value = 'h3';
selStyling.append(opt);

opt = document.createElement('option');
opt.innerHTML = 'Kapitel-Header';
opt.value = 'h2';
selStyling.append(opt);

opt = document.createElement('option');
opt.innerHTML = 'Titel';
opt.value = 'h1';
selStyling.append(opt);

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