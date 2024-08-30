'use strict';

const settings = {
    elements: {},
    story: {},
    activeElement:0,
    styles: {
        p: 'Fließtext (default)', 
        h1: 'StoryHeader', 
        h2: 'Kapitelheader',
        h3: 'Absatzheader', 
        h4: 'Fließtextheader',
        h5: 'Kleiner Header',
        b: 'Hervorhebung', 
        citation: 'Zitat'
    }
}

export default settings;
export let elements = settings.elements;