const express = require('express');
const router = express.Router();

const EmailSendController = require("../controllers/EmailSendControllers");
const emailSendController = new EmailSendController();

const EmailReceivedController = require("../controllers/EmailRecievedControllers");
const emailReceivedController = new EmailReceivedController();

//Sent Email
router.post("/", (req, res) => emailSendController.sendMail(req, res));
router.get("/", (req, res) => emailSendController.getAllSentEmail(req, res));


//Received Email
router.get("/received", (req, res) => emailReceivedController.getAllReceivedEmail(req, res));








module.exports = router;