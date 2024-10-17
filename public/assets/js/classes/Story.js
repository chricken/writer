'use strict';

import settings from '../settings.js';

class Story {
    constructor({
        title = '',
        owner = ''
    } = {}) {
        this.title = title;
        this.owner = owner;
        this.styles = Object.keys(settings.styles).reduce((obj, val) => {
            obj[val] = '';
            return obj;
        }, {});
        this.paragraphs = [];
        
        this.db = {
            year: new Date().getFullYear(),
            persons: [],
            places: [],
            groups:[],
            races:[],
            placetypes:[]
        };
    }
}

export default Story;