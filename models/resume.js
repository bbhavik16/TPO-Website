const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    description: String,
    stack:String,
    year: String
})

const achievementSchema = new Schema({
    title: String,
    description: String,
})

const resumeSchema = new Schema({
    personal: {
        firstName: String,
        lastName: String,
        mobile: Number,
        email: String,
        github: String,
        linkedin: String
    },
    education: {
        degreeCollege: {
            collegeName: String,
            location: String,
            degree: String,
            branch: String,
            cgpa: Number,
            year: String
        },
        juniorCollege: {
            collegeName: String,
            location: String,
            board: String,
            percentage: Number,
            year: String,
            jee: Number,
            cet: Number
        },
        school: {
            schoolName: String,
            location: String,
            Board: String,
            percentage: Number,
            year: String,
        }
    },
    skills: [String],
    projects: projectSchema,
    achievements: [achievementSchema],
    hobbies: [String]
})


const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
