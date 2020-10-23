'use strict';

const schema = require('./complaints-schema.js');
const Model = require('../crud.js');

class Complaints extends Model {
    constructor() {
        super(schema);
    }
}

module.exports = Complaints;