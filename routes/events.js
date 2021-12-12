const express = require("express");
const router = express.Router();
const Event = require('../models/events');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,isAdmin } = require('../middleware')
const ejs = require('ejs');
// var fs = require('fs');
const mailIt = require('../public/javascripts/neweventmail')


router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const events = await Event.find({});
    res.render('events/index', { events });
}))

router.get('/new', isAdmin,(req, res) => {
    res.render('events/new');
})

router.post('/:id/register',isLoggedIn,catchAsync(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    event.registeredUsers.push(req.user._id);
    await event.save();
    res.redirect("/events");
}))

router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.render('events/show', { event })
}))

router.post('/', isAdmin, catchAsync(async (req, res) => {
    const event = new Event(req.body.event);
    const output = await ejs.renderFile(process.cwd() + "/views/events/eventmail.ejs",
        {
            name: event.name,
            companyName: event.companyName,
            date: event.date,
            time: event.time,
            description: event.description
        });

    const allUsers = [];
    const users = await User.find({});
    for (let user of users) {
        allUsers.push(user.email);
    }
    mailIt.sendMail(output, allUsers)
    await event.save()
    res.redirect(`/events`);
}))

router.get('/:id/edit', isAdmin, catchAsync(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.render('events/edit', { event })
}))

router.put('/:id', isAdmin, catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, companyName, date, time, description } = req.body.event;
    const event = await Event.findByIdAndUpdate(id, { name, companyName, date, time, description });
    const output = await ejs.renderFile(process.cwd() + "/views/events/eventmail.ejs",
    {
        name,
        companyName,
        date,
        time,
        description
    });

    if(event.registeredUsers && event.registeredUsers.length !== 0){
        const allUsers = [];
        for (let userId of event.registeredUsers) {
            const user = await User.findById(userId);
            allUsers.push(user.email)
        }
        mailIt.sendMail(output, allUsers);
    }
    res.redirect('/events');
}))


router.delete('/:id', isAdmin, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect('/events');
}))


module.exports = router;