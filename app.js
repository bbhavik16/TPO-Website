if (process.env.NODE_ENV !== "production") { require("dotenv").config() }
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const path = require('path');
const Company = require('./models/company')
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync')
const { validateCompany } = require('./middleware.js')
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const localStrategy = require("passport-local")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/user.js")
// const cookieSession = require('cookie-session')
require('./passport-setup.js')

mongoose.connect('mongodb://localhost:27017/tpo-website', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind('console', "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sessionConfig = {
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

// app.use(cookieSession({
//     name: 'TPO-Website',
//     keys: ['key1', 'key2']
// }))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.engine('ejs', ejsMate)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))                        //For overriding post with delete or edit request
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render('layouts/boilerplate')
})

app.get('/home', (req, res) => {
    res.render('index');
})

app.get('/students', (req, res) => {
    res.render('students/index')
})

app.get('/students/process', (req, res) => {
    res.render('students/process')
})

app.get('/students/rules', (req, res) => {
    res.render('students/rules')
})

app.get('/companies', catchAsync(async (req, res) => {         // displaying company logo
    const companies = await Company.find({});
    res.render('companies/index', { companies })
})) 

app.get('/companies/new',(req,res)=>{          // adding new company
    res.render('companies/new')
}) 

app.get('/companies/:id', catchAsync(async(req,res)=>{      // showing company info
    const {id}=req.params;
    const company= await Company.findById(id);
    res.render('companies/show', {company});
}))

app.post('/companies', validateCompany, catchAsync(async (req,res)=>{
    const company = new Company(req.body.company);
    console.log(company);
    await company.save();
    res.redirect(`/companies/${company._id}`)
}))

app.get('/companies/:id/edit', catchAsync(async (req, res) => {
    const {id} = req.params;
    const company = await Company.findById(id);
    res.render('companies/edit', {company});
}))

app.put('/companies/:id', validateCompany, catchAsync(async (req, res) => {
    const {id} = req.params;
    const company = await Company.findByIdAndUpdate(id,{...req.body.company});
    res.redirect(`/companies/${company._id}`);
}))

app.delete('/companies/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Company.findByIdAndDelete(id);
    res.redirect('/companies');
}))

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/register',(req,res)=>{
    res.render('users/register');
})

app.post('/register',catchAsync(async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser)
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to VJTI-TPO');
            res.redirect('/companies');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

app.get('/login', (req, res) => {
    res.render('users/login')
})

app.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome back');
    // const redirectUrl = req.session.returnTo || '/companies';
    // delete req.session.returnTo;
    res.redirect('/companies')
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/companies')
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message)
        err.message = "Oh No, Something went wrong!"
    res.status(statusCode).render('error', {err})
})



app.listen(3000, () => {
    console.log("Listening on port 3000");
})
