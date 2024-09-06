'use strict';

import settings from '../settings.js';
import helpers from '../helpers.js';

class Person {
    constructor({
        id = false,
        name = '',
        race = '',
        synonyms = [],
        desc = '',
        birth = 0
    } = {}) {
        Object.assign(this, { id, name, race, synonyms, desc, birth });
        if (!this.id) this.id = helpers.getNextId(settings.story.db.persons);
    }

    // Kein Getter, da dieser in JSON umgewandelt würde
    getAge() {
        return settings.story.db.year - this.birth;
    }
}

export default Person;