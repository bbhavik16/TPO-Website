const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const eventSchema= new Schema({
    name: String,
    companyName:String,
    date: Date,
    time: String,
    registeredUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    reminderSent: Boolean
})

const events = mongoose.model("Event", eventSchema)
module.exports = events;
