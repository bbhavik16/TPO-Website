const Joi = require('joi');

module.exports.companySchema = Joi.object({
    company: Joi.object({
        name: Joi.string().required(),
        ctc: Joi.number().required().min(0),
        role: Joi.string().required(),
        location: Joi.string().required(),
        min_cgpa: Joi.number().required().min(6)
    })
})