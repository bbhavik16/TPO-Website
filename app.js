if (process.env.NODE_ENV !== "production") { require("dotenv").config() }
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const path = require('path');
const Company = require('./models/company')

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
//app.use(methodOverride("_method"))                        //For overriding post with delete or edit request
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

app.get('/makeCompany', async (req, res) => {
    const company = new Company({name: 'Google'});
    await company.save();
    res.send(company);
})

app.get('/contact',async (req, res) => {
    res.render('contact')
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})