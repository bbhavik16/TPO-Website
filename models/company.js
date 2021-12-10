const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_50/h_50')
});

const companySchema = new Schema({
    name: String,
    logo: ImageSchema,
    role: String,
    ctc: Number,
    website: String,
    branch: { type: [String] },
    min_cgpa: Number,
    location: String
    // add middleware for validating company login for adding/editing companies
})

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
