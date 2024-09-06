'use strict';

import settings from '../settings.js';

class Person {
    constructor(name = '', race = '', synonyms = [], desc = '', birth = 0) {
        Object.assign(this, { name, race, synonyms, desc, birth });
    }

    // Kein Getter, da dieser in JSON umgewandelt würde
    getAge(){
        return settings.story.db.year - this.birth;
    }
}

export default Person;