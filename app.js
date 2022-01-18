if (process.env.NODE_ENV !== "production") { require("dotenv").config() }
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const path = require('path');
const Company = require('./models/company')
const ExpressError = require('./utils/expressError');
const catchAsync = require('./utils/catchAsync')
const { validateCompany, isAuthor, isLoggedIn, validateResume } = require('./middleware.js')
const session = require('express-session');
const multer = require("multer")
const { storage } = require("./cloudinary")
const upload = multer({ storage })
const flash = require('connect-flash')
const passport = require('passport');
const localStrategy = require("passport-local")
const User = require("./models/user.js")
const fs = require('fs')
require('./passport-setup.js')
const companyRoutes = require('./routes/company');
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/users')
const statisticsRoutes = require('./routes/statistics')
const eventsRoutes = require('./routes/events');
const Resume = require('./models/resume');
const Event = require('./models/events');
const nodemailer = require('nodemailer');
var CronJob = require('cron').CronJob;
const mailIt = require('./public/javascripts/neweventmail')
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo')

const secret=process.env.SECRET || "thisshouldbesecret"
const dbUrl =process.env.DB_URL || 'mongodb://localhost:27017/tpo-website'

mongoose.connect(dbUrl, {
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
app.use(
    mongoSanitize({
        replaceWith: '_',
    }),
);
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret
    },
    touchAfter: 24 * 60 * 60
})


store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
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
    if (!['/login', '/register'].includes(req.originalUrl)) {
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
app.use('/statistics', statisticsRoutes);
app.use('/events', eventsRoutes);

var job = new CronJob('00 12 19 * * *', async function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const events = await Event.find({});
    for (let event of events) {
        const output = await ejs.renderFile(__dirname + "/views/events/eventmail.ejs",
            {
                name: event.name,
                companyName: event.companyName,
                date: event.date,
                time: event.time,
                description: event.description
            });

        const allUsers = [];
        for (let id of event.registeredUsers) {
            const user = await User.findById(id);
            allUsers.push(user.email)
        }

        if (event.date.slice(0, 4) == yyyy && event.date.slice(5, 7) == mm && Number(event.date.slice(8, 10)) - Number(dd) == 1) {
            mailIt.sendMail(output, allUsers)
            console.log('Event reminder sent!');
        }
    }
}, null, true, 'Asia/Kolkata');

job.start();

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/students/material', (req, res) => {
    res.render('students/material/material')
})
app.get('/home', (req, res) => {
    res.render('index');
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Oh No, Something went wrong!"
    res.status(statusCode).render('error', { err })
})
const port=process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})