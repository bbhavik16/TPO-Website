const Resume = require('./models/resume');
const ExpressError = require('./utils/expressError');
const { companySchema, resumeSchema } = require('./schemas.js');

module.exports.validateCompany = (req, res, next) => {
    const { error } = companySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/login')
    }
    next();
}

module.exports.isValidUser = (req, res, next) => {
    let s = req.body.email.slice(-14);
    let str = s.slice(1, 3);
    console.log(req.body.email);
    if (str === 'ce' || str === 'it' || str === 'et' || str === 'el' || str === 'ee' || str === 'me' || str === 'ci' || str === 'pe' || str === 'tx') {
        if (!(s === `@${str}.vjti.ac.in`)) {
            req.flash('error', 'NOT A VALID VJTI STUDENT');
            res.redirect('/register');
        }
        next();
    }
    else {
        req.flash('error', 'NOT A VALID VJTI STUDENT');
        res.redirect('/register');
    }
}


module.exports.validateResume = (req, res, next) => {
    const { error } = resumeSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that');
        return res.redirect("/students/resume");
    }
    next();
}

module.exports.isAdmin = async (req, res, next) => {
    if (req.user.email === 'tpowebsite2021@gmail.com') {
        next();
    } else {
        req.flash('error', 'You are not an admin');
        const redirectUrl = req.session.returnTo;
        if (redirectUrl[1] === "c") {
            return res.redirect('/companies');
        } else if (redirectUrl[1] === "e") {
            return res.redirect("/events");
        }
    }
}