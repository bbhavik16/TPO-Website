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

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be logged in');
        return res.redirect('/login')
    }
   
    next();
}

module.exports.isValidUser = (req, res, next) =>{
    let s = req.body.email.slice(-14);
    let str = s.slice(1,3);  
    if(str==='ce' || str==='it') {
        if(!(s===`@${str}.vjti.ac.in`)){
            req.flash('error','NOT A VALID VJTI STUDENT');
            res.redirect('/register');
        }
        next();
    }
    else {
        req.flash('error','NOT A VALID VJTI STUDENT');
        res.redirect('/register');
    }
}
