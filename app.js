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
const catchAsync =require('./utils/catchAsync')

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

app.post('/companies', catchAsync(async (req,res)=>{
    const company = new Company(req.body.company);
    await company.save();
    res.redirect(`/companies/${company._id}`)
}))

app.get('/companies/:id/edit', catchAsync(async (req, res) => {
    const {id} = req.params;
    const company = await Company.findById(id);
    res.render('companies/edit', {company});
}))

app.put('/companies/:id', catchAsync(async (req, res) => {
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
