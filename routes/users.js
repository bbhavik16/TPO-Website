const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require("../models/user.js")
const { isValidUser } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', isValidUser, catchAsync(async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to VJTI-TPO');
            const redirectUrl = req.session.returnTo || '/home';
            delete req.session.returnTo;
            res.redirect(redirectUrl)
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    redirectHere = req.session.returnTo || "/home";
    res.render('users/login')
})

router.post('/login', passport.authenticate(['local', 'passport-google-oauth20'], { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/home';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
})

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login'}),
    function (req, res) {
        res.redirect(redirectHere)
    });

module.exports = router;