const Company = require('./models/company');
const ExpressError = require('./utils/expressError');
const { companySchema } = require('./schemas.js');

module.exports.validateCompany = (req, res, next)=>{
    const {error} = companySchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}