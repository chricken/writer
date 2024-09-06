'use strict';

import settings from "../settings.js";

class Group {
    constructor(name = '', synonyms = [], desc = '') {
        Object.assign(this, { name, desc, synonyms });
        
        
    }
}

export default Group;