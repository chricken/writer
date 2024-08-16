'use strict';

import settings from '../settings.js';

class Story {
    constructor({
        title = ''
    } = {}) {
        this.title = title;
        this.owner = 'abc';
        this.styles = Object.keys(settings.styles).reduce((obj, val) => {
            obj[val] = '';
            return obj;
        }, {});
        this.paragraphs = [];
    }
}

export default Story;