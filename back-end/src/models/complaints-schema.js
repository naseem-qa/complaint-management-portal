'use strict';

const mongoose = require('mongoose');

const complaints = mongoose.Schema({
    name: { type: String, required: true },
    email: { type:String , required: true },
    contactNum: { type: Number, required: true },
    description: { type: String, required: true },
    username: { type: String, required: true },
    status: {type: String, default:'pending', enum: ['resolved','pending', 'dismissed']}
});

module.exports = mongoose.model('complaints', complaints);