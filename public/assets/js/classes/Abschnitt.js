'use strict';

class Scene {
    constructor(story) {
        this.id = (Math.random() * 1e17).toString(36);
        // ID einmalig machen
        while (story.paragraphs.find(p => p.id == this.id)) {
            this.id = (Math.random() * 1e17).toString(36);
        }

        this.style = 'p';
        this.content = '';
        // Setting, in dem die Scene stattfindet. Dient zur Übersicht
        this.type = 'default';
    }
}

export default Scene;