const express = require('express')
const router = express.Router();

router.get('/2019-20', (req, res) => {
    res.render('statistics/2019-20')
})

router.get('/2018-19', (req, res) => {
    res.render('statistics/2018-19')
})

router.get('/2017-18', (req, res) => {
    res.render('statistics/2017-18')
})

router.get('/2016-17', (req, res) => {
    res.render('statistics/2016-17')
})

router.get('/2015-16', (req, res) => {
    res.render('statistics/2015-16')
})

module.exports = router;