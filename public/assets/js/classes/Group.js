'use strict';

import settings from "../settings.js";
import helpers from '../helpers.js';

class Group {
    constructor({ id = false, name = '', synonyms = [], desc = '' }) {
        Object.assign(this, {id,  name, desc, synonyms });
        if(!this.id) this.id = helpers.getNextId(settings.story.db.groups);
    }
}

export default Group;