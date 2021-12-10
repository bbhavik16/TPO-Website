const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    personal: {
        firstName: String,
        lastName: String,
        mobile: Number,
        email: String,
        github: String,
        linkedin: String
    },
    degreeCollege: {
        name: String,
        location: String,
        degree: String,
        branch: String,
        cgpa: Number,
        year: String
    },
    juniorCollege: {
        name: String,
        location: String,
        board: String,
        percentage: Number,
        year: String,
        jee: Number,
        cet: Number
    },
    school: {
        name: String,
        location: String,
        board: String,
        percentage: Number,
        year: String,
    },
    skills: [String],
    projects: [{
        title: String,
        description: String,
        stack: String,
        year: String
    }],
    achievements: [{
        title: String,
        description: String,
    }],

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;