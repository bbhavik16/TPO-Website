const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware')

router.get('/', (req, res) => {
    res.render('students/index')
})

router.get('/process', (req, res) => { 
    res.render('students/process')
})

router.get('/rules', (req, res) => {
    res.render('students/rules')
})

router.get('/material', isLoggedIn, (req, res) => {
    res.render('students/material')
})

router.get('/transcripts', isLoggedIn, (req, res) => {
    res.render('students/transcripts')
})

router.get('/alumni', (req, res) => {
    res.render('students/alumni')
})

module.exports = router;