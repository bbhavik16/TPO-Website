const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String
})

const companySchema = new Schema({
    name: String,
    logo: ImageSchema,
    role: String,
    ctc: Number,
    website: String,
    branch: {type:[String]},
    min_cgpa: Number,
    location: String
})

const Company = mongoose.model('Company',companySchema);

module.exports = Company; 
