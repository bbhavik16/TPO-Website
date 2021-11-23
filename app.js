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
const multer=require("multer")
const {storage}=require("./cloudinary")
const upload=multer({storage})
const flash = require('connect-flash')
const passport = require('passport');
const localStrategy = require("passport-local")
const User = require("./models/user.js")
const fs = require('fs')
require('./passport-setup.js')
const companyRoutes = require('./routes/company');
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/users')

mongoose.connect('mongodb://localhost:27017/tpo-website', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind('console', "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

app.engine('ejs', ejsMate)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))                        //For overriding post with delete or edit request
app.use(express.static(path.join(__dirname, "public")))

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    if(!['/login', '/register'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/companies', companyRoutes);
app.use('/students', studentRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/home', (req, res) => {
    res.render('index');
})

app.get('/statistics/2019-20', (req, res) => {
    res.render('statistics/2019-20')
})

app.get('/statistics/2018-19', (req, res) => {
    res.render('statistics/2018-19')
})

app.get('/statistics/2017-18', (req, res) => {
    res.render('statistics/2017-18')
})

app.get('/statistics/2016-17', (req, res) => {
    res.render('statistics/2016-17')
})

app.get('/statistics/2015-16', (req, res) => {
    res.render('statistics/2015-16')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

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