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
const { validateCompany, Author, isLoggedIn, validateResume } = require('./middleware.js')
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
const Resume = require('./models/resume');

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

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/home', (req, res) => {
    res.render('index');
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/students/resume', isLoggedIn, catchAsync(async (req, res) => {
    const resumes = await Resume.find({})
    res.render('students/resume/index', { resumes });
}))


app.get('/students/resume/new', isLoggedIn, (req, res) => {
    res.render('students/resume/new')
})

app.get('/students/resume/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
        req.flash('error', 'Cannot find that resume!');
        return res.redirect('/students/resume');
    }
    res.render('students/resume/show', { resume })
}))

app.post('/students/resume', isLoggedIn, catchAsync(async (req, res) => {
    const { personal, degreeCollege, juniorCollege, school, skills, projects, achievements } = req.body;
    const newResume = new Resume({
        personal,
        degreeCollege,
        juniorCollege,
        school,
        skills,
        projects,
        achievements
    });
    const user = await User.findById(req.user._id);
    if (!user.resumes) {
        user.resumes.push(newResume._id)
    } else {
        user.resumes.push(newResume._id)
    }
    newResume.author = req.user._id;
    await newResume.save();
    await user.save();
    console.log(user);
    console.log(newResume)
    req.flash('success', 'new resume made!!!!!')
    res.redirect(`/students/resume/${newResume._id}`);
}))

app.get('/students/resume/:id/edit', isLoggedIn, catchAsync(async (req, res) => {

    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
        req.flash('error', 'Cannot find that resume!');
        return res.redirect('/students/resume');
    } else if (resume.author) {
        res.render("students/resume/edit", { resume })
    }
}))

app.put('/students/resume/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateResume = await Resume.findByIdAndUpdate(id, { ...req.body });
    if (updateResumeresume.author) {
        await updateResume.save();
        req.flash('success', 'YOour Resume Updated')
        res.redirect(`/students/resume/${id}`);
    }
}))

app.delete('/students/resume/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    if (Resume.findById(id).author) {
        const deleteResume = await Resume.findByIdAndDelete(id);
        req.flash('success', 'Your Resume Deleted')
        res.redirect('/students/resume');
    }
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Oh No, Something went wrong!"
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})