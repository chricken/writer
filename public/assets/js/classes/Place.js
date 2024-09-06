'use strict';

import settings from '../settings.js';

class Place {

    constructor(name = '', type = '', synonyms = [], desc = '') {
        Object.assign(this, { name, type, synonyms, desc });
    }

}

export default Place;