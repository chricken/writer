'use strict';

const template = document.createElement('div');
template.className = 'container';

// Frame
const elFrame = document.createElement('div');
elFrame.className = 'frame';
template.append(elFrame);

const inpUser = document.createElement('my-input');
inpUser.className = 'inpUser';
elFrame.append(inpUser);

const inpPassword = document.createElement('my-input');
inpPassword.className = 'inpPassword';
elFrame.append(inpPassword);

const btnSend = document.createElement('my-button');
btnSend.className = 'btnSend';
elFrame.append(btnSend);

// Dies funktioniert nicht aus Timing-Gründen: Der Input wurde nicht vollständig implementiert
// Statt dessen wird diese Funktion im connectedCallback aufgerufen
/*
myInput.update({
    legend: 'Username',
    type:'text'
})
*/

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