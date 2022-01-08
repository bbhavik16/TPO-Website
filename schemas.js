const BaseJoi = require("joi");
const sanitizeHtml = require('sanitize-html')

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi = BaseJoi.extend(extension)

module.exports.companySchema = Joi.object({
    company: Joi.object({
        name: Joi.string().required().escapeHTML(),
        ctc: Joi.number().required(),
        role: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        min_cgpa: Joi.number().required()
    })
})

module.exports.resumeSchema = Joi.object().keys({
    personal: Joi.object({
        firstName: Joi.string().required().escapeHTML(),
        lastName: Joi.string().required().escapeHTML(),
        mobile: Joi.number().required(),
        email: Joi.string().required().escapeHTML(),
        github: Joi.string().optional().allow('').escapeHTML(),
        linkedin: Joi.string().optional().allow('')
    }),
    degreeCollege: Joi.object({
        name: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        degree: Joi.string().required().escapeHTML(),
        branch: Joi.string().required().escapeHTML(),
        cgpa: Joi.string().optional().allow('').escapeHTML(),
        year: Joi.string().required().escapeHTML(),
    }),
    juniorCollege: Joi.object({
        name: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        board: Joi.string().required().escapeHTML(),
        percentage: Joi.number().required().min(0),
        year: Joi.string().required().escapeHTML(),
        jee: Joi.string().optional().allow('').escapeHTML(),
        cet: Joi.string().optional().allow('').escapeHTML()
    }),
    school: Joi.object({
        name: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        board: Joi.string().required().escapeHTML(),
        percentage: Joi.number().required().min(0),
        year: Joi.string().required().escapeHTML(),
    }),
    skills: [Joi.string().optional().allow(''), Joi.array().items(Joi.string().allow(''))],
    projects: Joi.array(),
    achievements: Joi.array()
})