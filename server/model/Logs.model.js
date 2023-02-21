const mongoose = require('mongoose');
const { Schema } = mongoose;

const Logs = new Schema({
    _id: { type: String },
    phoneNumber: { type: String },
    timeCall: { type: Number },
    statusCall: {type: Number},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logs', Logs);