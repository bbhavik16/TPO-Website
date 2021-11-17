const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.set("view engine", "ejs")                      //For EJS 
app.set("views", path.join(__dirname, "views"))    //

app.use(express.urlencoded({ extended: true }))
//app.use(methodOverride("_method"))                        //For overriding post with delete or edit request
app.use(express.static(path.join(__dirname, "public"))) 

app.get('/', (req, res) => {
     res.render('layout/boilerplate')
})

app.get('/home', (req, res) => {
    res.render('/home');
})

app.get('/students', (req, res) => {
    res.render('students/index')
})

app.listen(3000, () => { 
    console.log("Listening on port 3000"); 
})