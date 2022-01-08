const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    resumes: [{
        type: Schema.Types.ObjectId,
        ref: 'Resume'
    }],
    googleId: {
        type: String
    },
    name: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate)
module.exports = mongoose.model('User', UserSchema);