const express = require('express');
const router = express.Router();
const Contact= require("../models/contactModel")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
const ensureAuthenticated= require("../middleware/auth")

const ContactController = require("../controllers/ContactControllers");
const contactController = new ContactController();

//CREATE NEW CONTACT
router.post("/",ensureAuthenticated,(req, res) => contactController.createContact(req, res));
router.get("/",  ensureAuthenticated, (req, res) => contactController.getAllContacts(req, res));
router.get("/:id",  ensureAuthenticated, (req, res) => contactController.getContact(req, res));
router.patch("/:id",  ensureAuthenticated, (req, res) => contactController.updateContact(req, res));
router.delete("/:id", ensureAuthenticated, (req, res) => contactController.deleteContact(req, res));



module.exports = router;
