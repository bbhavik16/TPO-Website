const express = require('express');
const router = express.Router();
const { isLoggedIn, isAuthor } = require('../middleware')
const catchAsync = require('../utils/catchAsync')
const User = require("../models/user.js")
const Resume = require('../models/resume');
const { validateResume } = require('../middleware.js')

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


// RESUME ROUTES
router.get('/resume', isLoggedIn, catchAsync(async (req, res) => {
    const resumes = await Resume.find({})
    res.render('students/resume/index', { resumes });
}))


router.get('/resume/new', isLoggedIn, (req, res) => {
    res.render('students/resume/new')
})

router.get('/resume/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
        req.flash('error', 'Cannot find that resume!');
        return res.redirect('/students/resume');
    }
    res.render('students/resume/show', { resume })
}))

router.post('/resume', isLoggedIn, validateResume, catchAsync(async (req, res) => {
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
    newResume.author = req.user._id;
    const user = await User.findById(req.user._id);
    user.resumes.push(newResume);

    await newResume.save();
    await user.save();
    req.flash('success', 'New resume made!!!!!')
    res.redirect(`/students/resume/${newResume._id}`);
}))

router.get('/resume/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
        req.flash('error', 'Cannot find that resume!');
        return res.redirect('/students/resume');
    } else if (resume.author) {
        res.render("students/resume/edit", { resume })
    }
}))

router.put('/resume/:id', isLoggedIn, isAuthor, validateResume, catchAsync(async (req, res) => {
    const { id } = req.params;
    let resume;
    if(!req.body.skills){
        resume = await Resume.findByIdAndUpdate(id, { ...req.body, skills:[] });
    } else {
        resume = await Resume.findByIdAndUpdate(id, { ...req.body });
    }
    if(!req.body.projects){
        resume = await Resume.findByIdAndUpdate(id, { ...req.body, projects:[] });
    } else {
        resume = await Resume.findByIdAndUpdate(id, { ...req.body });
    }
    if(!req.body.achievements){
        resume = await Resume.findByIdAndUpdate(id, { ...req.body, achievements:[] });
    } else {
        resume = await Resume.findByIdAndUpdate(id, { ...req.body });
    }
    req.flash('success', 'Your Resume Updated')
    res.redirect(`/students/resume/${resume.id}`);
}))

router.delete('/resume/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Resume.findByIdAndDelete(id);
    req.flash('success', 'Your Resume Deleted')
    res.redirect('/students/resume');
}))


// TRANSCRIPTS ROUTES
router.get('/transcripts/2021/internships', (req, res) => {
    res.render('students/transcripts/2021internships')
})

router.get('/transcripts/2021/placements', (req, res) => {
    res.render('students/transcripts/2021placements')
})

router.get('/transcripts/2020', (req, res) => {
    res.render('students/transcripts/2020')
})

router.get('/transcripts/2019', (req, res) => {
    res.render('students/transcripts/2019')
})

router.get('/transcripts/2018before', (req, res) => {
    res.render('students/transcripts/2018before')
})

module.exports = router;