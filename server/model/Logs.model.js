import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const Logs = new Schema({
    _id: { type: String },
    phoneNumber: { type: String },
    timeCall: { type: Number },
    statusCall: {type: Number},
    createdAt: { type: Date, default: Date.now },
});

export default model('Logs', Logs);