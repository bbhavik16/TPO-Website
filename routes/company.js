const express = require('express');
const router = express.Router();
const Company = require('../models/company')
const catchAsync = require('../utils/catchAsync');
const { validateCompany } = require('../middleware.js')
const multer=require("multer")
const {storage}=require("../cloudinary")
const upload=multer({storage})

router.get('/', catchAsync(async (req, res) => {         // displaying company logo
    const companies = await Company.find({}); 
    res.render('companies/index', { companies })
})) 

router.get('/new',(req,res)=>{          // adding new company
    res.render('companies/new')
}) 

router.get('/:id', catchAsync(async(req,res)=>{      // showing company info
    const {id}=req.params;
    const company= await Company.findById(id);
    res.render('companies/show', {company});
}))

router.post('/', upload.single("image"), validateCompany, catchAsync(async (req,res)=>{
    const company = new Company({
        name:req.body.company.name,
        ctc:req.body.company.ctc,
        role:req.body.company.role,
        location:req.body.company.location,
        min_cgpa:req.body.company.min_cgpa,
        logo:{
            filename:req.file.filename,
            url:req.file.path
        }
    });
    await company.save();
    req.flash('success', 'Added new company');
    res.redirect(`/companies/${company._id}`)
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const {id} = req.params;
    const company = await Company.findById(id);
    res.render('companies/edit', {company});
}))

router.put('/:id', validateCompany, catchAsync(async (req, res) => {
    const {id} = req.params;
    const company = await Company.findByIdAndUpdate(id,{...req.body.company});
    res.redirect(`/companies/${company._id}`);
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Company.findByIdAndDelete(id);
    res.redirect('/companies');
}))

module.exports = router;