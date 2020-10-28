const express = require('express');
const router = express.Router();
const Contact= require("../models/contactModel")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
const checkLogin= require("../middleware/checkLogin")

const ContactController = require("../controllers/ContactControllers");
const { json } = require('body-parser');
const contactController = new ContactController();


//SHOW ALL CONTACTS AND THE NEW CONTACT FORM
router.get("/", checkLogin, async (req, res) => {

    contactController.getAllContacts(req, res)
    .then(data => {

        res.render('../views/pages/contacts.ejs', {
            title: "Add Contact",
            action: "contacts/add",
            fields: [
                {label:'First Name', name:'firstName', type:'text', property:'required'},
                {label:'Last Name', name:'lastName', type:'text', property:'required'},
                {label:'Email', name:'email', type:'text', property:'required'},
                {label:'Role', name:'role', type:'text'},
                {label:'Tags', name:'tags', type:'text'},
                {label:'Company', name:'company', type:'text'},
                {label:'Phone Number', name:'phoneNumber', type:'text', property:'required'},
                {label:'Website', name:'website', type:'text'},
                {label:'Address', name:'address', type:'text', property:'required'},
                {label:'City', name:'city', type:'text', property:'required'},
                {label:'Zip Code', name:'zipCode', type:'text', property:'required'},
                {label:'Country', name:'country', type:'text', property:'required'}
            ],
            data: data
        });
       
    }).catch(err => console.error(err));
    
});


//CREATE NEW COMPANY
router.get("/company", checkLogin,(req, res) => {
    
    contactController.getAllContacts(req, res)
    .then(data => {
        
    res.render('../views/pages/companies.ejs', {
        title: "Add Company",
        action: "/add",
        fields: [
            {label:'Name', name:'name', type:'text', property:'required'},
            {label:'Domain', name:'domain', type:'text', property:'required'},
            {label:'Email', name:'email', type:'text', property:'required'},
            {label:'Contacts', name:'contacts', type:'text'},
            {label:'Phone Number', name:'phoneNumber', type:'text', property:'required'},
            {label:'Address', name:'address', type:'text', property:'required'},
            {label:'City', name:'city', type:'text', property:'required'},
            {label:'State', name:'state', type:'text'},
            {label:'Zip Code', name:'zipCode', type:'text', property:'required'},
            {label:'Country', name:'country', type:'text', property:'required'}
        ],
        
        data: data
    });
   
}).catch(err => console.error(err));
});

//SAVE NEW CONTACT
router.post("/add",checkLogin,(req, res) => contactController.createContact(req, res));

//CREATE NEW List
router.get("/lists", checkLogin,(req, res) => {
    
    contactController.getAllContacts(req, res)
    .then(data => {

    res.render('../views/pages/lists.ejs', {
        title: "Add List",
        action: "/add",
        fields: [
            {label:'Name', name:'name', type:'text', property:'required'},
            {label:'Owner', name:'owner', type:'text', property:'required'},
            {label:'Contacts', name:'contacts', type:'text', property:'required'},
            {label:'Status', name:'status', type:'text'},
            {label:'Created On', name:'createdOn', type:'text'}
        ],
        data: data
        });
       
    }).catch(err => console.error(err));
});

router.get("/:id",  checkLogin, (req, res) => contactController.getContact(req, res));
router.patch("/:id",  checkLogin, (req, res) => contactController.updateContact(req, res));
router.delete("/:id", checkLogin, (req, res) => contactController.deleteContact(req, res));



module.exports = router;
