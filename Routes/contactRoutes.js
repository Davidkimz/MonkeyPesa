const express = require('express');
const router = express.Router();
const Contact= require("../models/contactModel")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const ContactController = require("../controllers/ContactControllers");
const contactController = new ContactController();

//CREATE NEW CONTACT
router.post("/", auth,(req, res) => contactController.createContact(req, res));
router.get("/",  auth, (req, res) => contactController.getAllContacts(req, res));
router.get("/:id",  auth, (req, res) => contactController.getContact(req, res));
router.patch("/:id",  auth, (req, res) => contactController.updateContact(req, res));
router.delete("/:id", auth, (req, res) => contactController.deleteContact(req, res));



module.exports = router;
