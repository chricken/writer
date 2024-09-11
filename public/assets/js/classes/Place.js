'use strict';

import settings from '../settings.js';
import helpers from '../helpers.js';


class Place {
    constructor({
        id = false,
        name = '', type = '',
        synonyms = [],
        desc = ''
    } = {}) { 
        Object.assign(this, { id, name, type, synonyms, desc });
        if (!this.id) this.id = helpers.getNextId(settings.story.db.places);
    }

}

export default Place;