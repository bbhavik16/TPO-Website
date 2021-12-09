const Joi = require("joi");
module.exports.companySchema = Joi.object({
    company: Joi.object({
        name: Joi.string().required(),
        ctc: Joi.string().required(),
        role: Joi.string().required(),
        location: Joi.string().required(),
        min_cgpa: Joi.string().required()
    })
})

module.exports.resumeSchema = Joi.object().keys({
    personal: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        mobile: Joi.number().required(),
        email: Joi.string().required(),
        github: Joi.string().optional().allow(''),
        linkedin: Joi.string().optional().allow('')
    }),
    degreeCollege: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        degree: Joi.string().required(),
        branch: Joi.string().required(),
        cgpa: Joi.string().optional().allow(''),
        year: Joi.string().required(),
    }),
    juniorCollege: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        board: Joi.string().required(),
        percentage: Joi.number().required().min(0),
        year: Joi.string().required(),
        jee: Joi.string().optional().allow(''),
        cet: Joi.string().optional().allow('')
    }),
    school: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        board: Joi.string().required(),
        percentage: Joi.number().required().min(0),
        year: Joi.string().required(),
    }),
    skills: Joi.array(),
    projects: Joi.array(),
    achievements: Joi.array()
})
