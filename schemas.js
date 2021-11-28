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

// module.exports.resumeSchema = Joi.object({
//     personal:Joi.object({
//          firstName:Joi.string().required(),
//          lastName:Joi.string().required(),
//          mobile:Joi.number().required(),
//          email:Joi.string().required(),
//     }),
//     degreeCollege:Joi.object({
//         name: Joi.string().required(),
//         location: Joi.string().required(),
//         degree:Joi.string().required(),
//         branch:Joi.string().required(),
//         cgpa:Joi.number().required().min(0),
//         year:Joi.string().required(),
//     }),
//     juniorCollege:Joi.object({
//         name: Joi.string().required(),
//         location: Joi.string().required(),
//         board:Joi.string().required(),
//         percentage:Joi.number().required().min(0),
//         year:Joi.string().required(),
//         jee:Joi.number().min(0),
//         cet:Joi.number().min(0),
//     }),
//     school:Joi.object({
//         name: Joi.string().required(),
//         location: Joi.string().required(),
//         board:Joi.string().required(),
//         percentage:Joi.number().required().min(0),
//         year:Joi.string().required(),
//     }),
    
// }) 

   

